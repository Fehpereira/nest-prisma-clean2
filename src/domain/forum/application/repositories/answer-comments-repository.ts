import { Injectable } from '@nestjs/common';
import { PaginationParams } from '../../../../core/repositories/pagination-params.js';
import type { AnswerComment } from '../../enterprise/entities/answer-comment.js';

@Injectable()
export abstract class AnswerCommentsRepository {
  abstract create(answerComment: AnswerComment): Promise<void>;
  abstract findById(id: string): Promise<AnswerComment | null>;
  abstract findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>;
  abstract delete(answerComment: AnswerComment): Promise<void>;
}
