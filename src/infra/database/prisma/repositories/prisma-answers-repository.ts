import { Injectable } from '@nestjs/common';
import { PaginationParams } from 'src/core/repositories/pagination-params.js';
import { AnswersRepository } from 'src/domain/forum/application/repositories/answers-repository.js';
import { Answer } from 'src/domain/forum/enterprise/entities/answer.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(private prisma: PrismaService) {}

  async create(answer: Answer): Promise<void> {}
  async delete(answer: Answer): Promise<void> {}
  async findById(id: string): Promise<Answer | null> {}
  async findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]> {}
  async save(answer: Answer): Promise<void> {}
}
