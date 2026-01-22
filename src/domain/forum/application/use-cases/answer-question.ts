import { Answer } from '../../enterprise/entities/answer.js';
import type { AnswersRepository } from '../repositories/answers-repository.js';
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment.js';
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list.js';
import { Either, right } from '../../../../core/either.js';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';
import { Inject, Injectable } from '@nestjs/common';
import { ANSWERS_REPOSITORY } from '../repositories/answers-repository.token.js';

interface AnswerQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
  attachmentsIds: string[];
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer;
  }
>;

@Injectable()
export class AnswerQuestionUseCase {
  constructor(
    @Inject(ANSWERS_REPOSITORY)
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
    attachmentsIds,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
    });

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      });
    });

    answer.attachments = new AnswerAttachmentList(answerAttachments);

    await this.answersRepository.create(answer);

    return right({ answer });
  }
}
