import { Injectable } from '@nestjs/common';
import { PaginationParams } from 'src/core/repositories/pagination-params.js';
import { QuestionsRepository } from 'src/domain/forum/application/repositories/questions-repository.js';
import { Question } from 'src/domain/forum/enterprise/entities/question.js';
import { PrismaService } from '../prisma.service.js';
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper.js';

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!question) {
      return null;
    }

    return PrismaQuestionMapper.toDomain(question);
  }
  async findBySlug(slug: string): Promise<Question | null> {}
  async findManyRecent(params: PaginationParams): Promise<Question[]> {}
  async save(question: Question): Promise<void> {}
  async create(question: Question): Promise<void> {}
  async delete(question: Question): Promise<void> {}
}
