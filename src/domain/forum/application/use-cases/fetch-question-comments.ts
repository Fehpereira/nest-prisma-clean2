import { Injectable } from '@nestjs/common';
import { Either, right } from '../../../../core/either.js';
import type { QuestionComment } from '../../enterprise/entities/question-comment.js';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository.js';

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string;
  page: number;
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[];
  }
>;

@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(private commentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments = await this.commentsRepository.findManyByQuestionId(
      questionId,
      { page },
    );

    return right({ questionComments });
  }
}
