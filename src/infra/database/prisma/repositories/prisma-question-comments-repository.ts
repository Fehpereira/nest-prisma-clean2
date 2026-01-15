import { Injectable } from '@nestjs/common';
import { PaginationParams } from '../../../../core/repositories/pagination-params.js';
import { QuestionCommentsRepository } from '../../../../domain/forum/application/repositories/question-comments-repository.js';
import { QuestionComment } from '../../../../domain/forum/enterprise/entities/question-comment.js';
import { Question } from '../../../../domain/forum/enterprise/entities/question.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class PrismaQuestionCommentsRepository implements QuestionCommentsRepository {
  constructor(private prisma: PrismaService) {}

  async findBySlug(slug: string): Promise<Question | null> {
    throw new Error('Method not implanted');
  }
  async findManyRecent(params: PaginationParams): Promise<Question[]> {
    throw new Error('Method not implanted');
  }
  async save(question: Question): Promise<void> {}
  async create(questionComment: QuestionComment): Promise<void> {}
  async delete(questionComment: QuestionComment): Promise<void> {}
  async findById(id: string): Promise<QuestionComment | null> {
    throw new Error('Method not implanted');
  }
  async findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]> {
    throw new Error('Method not implanted');
  }
}
