import { Injectable } from '@nestjs/common';
import { PaginationParams } from 'src/core/repositories/pagination-params.js';
import { AnswerCommentsRepository } from 'src/domain/forum/application/repositories/answer-comments-repository.js';
import { AnswerComment } from 'src/domain/forum/enterprise/entities/answer-comment.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class PrismaAnswerCommentsRepository implements AnswerCommentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(answerComment: AnswerComment): Promise<void> {}
  async delete(answerComment: AnswerComment): Promise<void> {}
  async findById(id: string): Promise<AnswerComment | null> {}
  async findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]> {}
}
