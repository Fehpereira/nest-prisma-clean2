import { Injectable } from '@nestjs/common';
import { PaginationParams } from '../../../../core/repositories/pagination-params.js';
import { AnswerCommentsRepository } from '../../../../domain/forum/application/repositories/answer-comments-repository.js';
import { AnswerComment } from '../../../../domain/forum/enterprise/entities/answer-comment.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class PrismaAnswerCommentsRepository implements AnswerCommentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implanted');
  }
  async delete(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implanted');
  }
  async findById(id: string): Promise<AnswerComment | null> {
    throw new Error('Method not implanted');
  }
  async findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]> {
    throw new Error('Method not implanted');
  }
}
