import type { QuestionsRepository } from '../repositories/questions-repository.js';
import { QuestionComment } from '../../enterprise/entities/question-comment.js';
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository.js';
import { Either, left, right } from 'src/core/either.js';
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error.js';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id.js';

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment;
  }
>;

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      left(new ResourceNotFoundError());
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionCommentRepository.create(questionComment);

    return right({
      questionComment,
    });
  }
}
