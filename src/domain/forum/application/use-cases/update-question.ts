import type { Question } from '../../enterprise/entities/question.js';
import type { QuestionsRepository } from '../repositories/questions-repository.js';
import type { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository.js';
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list.js';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment.js';
import { Either, left, right } from 'src/core/either.js';
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error.js';
import { NotAllowedError } from 'src/core/errors/errors/not-allowed-error.js';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id.js';

interface UpdateQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
  attachmentsIds: string[];
}

type UpdateQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

export class UpdateQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
    title,
    attachmentsIds,
  }: UpdateQuestionUseCaseRequest): Promise<UpdateQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId);

    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments,
    );

    const questionAttachments = attachmentsIds.map((attachmentsId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentsId),
        questionId: question.id,
      });
    });

    questionAttachmentList.update(questionAttachments);

    question.attachments = questionAttachmentList;
    question.title = title;
    question.content = content;

    await this.questionsRepository.save(question);

    return right({ question });
  }
}
