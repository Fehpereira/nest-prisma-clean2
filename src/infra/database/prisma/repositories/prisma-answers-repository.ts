import { Injectable } from '@nestjs/common';
import { PaginationParams } from '../../../../core/repositories/pagination-params.js';
import { AnswersRepository } from '../../../../domain/forum/application/repositories/answers-repository.js';
import { Answer } from '../../../../domain/forum/enterprise/entities/answer.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(private prisma: PrismaService) {}

  async create(answer: Answer): Promise<void> {}
  async delete(answer: Answer): Promise<void> {}
  async findById(id: string): Promise<Answer | null> {
    throw new Error('Method not implanted');
  }
  async findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]> {
    throw new Error('Method not implanted');
  }
  async save(answer: Answer): Promise<void> {}
}
