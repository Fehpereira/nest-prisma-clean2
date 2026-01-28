import { Injectable } from '@nestjs/common';
import { Either, right } from '../../../../core/either.js';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository.js';
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author.js';

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string;
  page: number;
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[];
  }
>;

@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(private commentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const comments =
      await this.commentsRepository.findManyByQuestionIdWithAuthor(questionId, {
        page,
      });

    return right({ comments });
  }
}
