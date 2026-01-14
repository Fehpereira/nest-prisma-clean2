import { Either, left, right } from 'src/core/either.js';
import { Question } from '../../enterprise/entities/question.js';
import type { QuestionsRepository } from '../repositories/questions-repository.js';
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error.js';

interface GetQuestionBySlugUseCaseRequest {
  slug: string;
}

type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question;
  }
>;

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    return right({ question });
  }
}
