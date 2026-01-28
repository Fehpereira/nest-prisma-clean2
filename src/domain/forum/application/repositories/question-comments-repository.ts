import { Injectable } from '@nestjs/common';
import { PaginationParams } from '../../../../core/repositories/pagination-params.js';
import type { QuestionComment } from '../../enterprise/entities/question-comment.js';
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author.js';

@Injectable()
export abstract class QuestionCommentsRepository {
  abstract findById(id: string): Promise<QuestionComment | null>;
  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>;
  abstract findManyByQuestionIdWithAuthor(
    questionId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]>;
  abstract delete(questionComment: QuestionComment): Promise<void>;
  abstract create(questionComment: QuestionComment): Promise<void>;
}
