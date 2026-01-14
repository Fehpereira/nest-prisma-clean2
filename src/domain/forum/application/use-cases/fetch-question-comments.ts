import { Either, right } from 'src/core/either.js';
import type { QuestionComment } from '../../enterprise/entities/question-comment.js';
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository.js';

interface FetchQuestionsCommentsUseCaseRequest {
  questionId: string;
  page: number;
}

type FetchQuestionsCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[];
  }
>;

export class FetchQuestionsCommentsUseCase {
  constructor(private commentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionsCommentsUseCaseRequest): Promise<FetchQuestionsCommentsUseCaseResponse> {
    const questionComments = await this.commentsRepository.findManyByQuestionId(
      questionId,
      { page },
    );

    return right({ questionComments });
  }
}
