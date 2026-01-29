import { Injectable } from '@nestjs/common';
import { Either, right } from '../../../../core/either.js';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository.js';
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author.js';

interface FetchAnswersCommentsUseCaseRequest {
  answerId: string;
  page: number;
}

type FetchAnswersCommentsUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[];
  }
>;

@Injectable()
export class FetchAnswersCommentsUseCase {
  constructor(private commentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswersCommentsUseCaseRequest): Promise<FetchAnswersCommentsUseCaseResponse> {
    const comments = await this.commentsRepository.findManyByAnswerIdWithAuthor(
      answerId,
      { page },
    );

    return right({ comments });
  }
}
