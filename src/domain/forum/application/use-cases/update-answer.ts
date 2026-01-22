import type { Answer } from '../../enterprise/entities/answer.js';
import { AnswersRepository } from '../repositories/answers-repository.js';
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository.js';
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list.js';
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment.js';
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error.js';
import { Either, left, right } from '../../../../core/either.js';
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error.js';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';
import { Injectable } from '@nestjs/common';

interface UpdateAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
  attachmentsIds: string[];
}

type UpdateAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

@Injectable()
export class UpdateAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: UpdateAnswerUseCaseRequest): Promise<UpdateAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId);

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    );

    const answerAttachments = attachmentsIds.map((attachmentsId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentsId),
        answerId: answer.id,
      });
    });

    answerAttachmentList.update(answerAttachments);

    answer.attachments = answerAttachmentList;

    answer.content = content;

    await this.answersRepository.save(answer);

    return right({ answer });
  }
}
