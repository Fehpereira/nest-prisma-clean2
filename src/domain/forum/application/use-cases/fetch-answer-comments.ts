import { Either, right } from '../../../../core/either.js';
import type { AnswerComment } from '../../enterprise/entities/answer-comment.js';
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository.js';

interface FetchAnswersCommentsUseCaseRequest {
  answerId: string;
  page: number;
}

type FetchAnswersCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[];
  }
>;

export class FetchAnswersCommentsUseCase {
  constructor(private commentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswersCommentsUseCaseRequest): Promise<FetchAnswersCommentsUseCaseResponse> {
    const answerComments = await this.commentsRepository.findManyByAnswerId(
      answerId,
      { page },
    );

    return right({ answerComments });
  }
}
