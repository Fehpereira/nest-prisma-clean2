import { Either, left, right } from 'src/core/either.js';
import type { AnswersRepository } from '../repositories/answers-repository.js';
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error.js';
import { NotAllowedError } from 'src/core/errors/errors/not-allowed-error.js';

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>;

export class DeleteAnswerUseCase {
  constructor(private AnswersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.AnswersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.AnswersRepository.delete(answer);

    return right(null);
  }
}
