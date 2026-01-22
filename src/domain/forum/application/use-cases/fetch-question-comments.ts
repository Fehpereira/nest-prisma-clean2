import { Injectable } from '@nestjs/common';
import { Either, right } from '../../../../core/either.js';
import type { QuestionComment } from '../../enterprise/entities/question-comment.js';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository.js';

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

@Injectable()
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
