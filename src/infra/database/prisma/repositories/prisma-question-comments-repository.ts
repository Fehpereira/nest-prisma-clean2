import { Injectable } from '@nestjs/common';
import { PaginationParams } from 'src/core/repositories/pagination-params.js';
import { QuestionCommentsRepository } from 'src/domain/forum/application/repositories/question-comments-repository.js';
import { QuestionComment } from 'src/domain/forum/enterprise/entities/question-comment.js';
import { Question } from 'src/domain/forum/enterprise/entities/question.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class PrismaQuestionCommentsRepository implements QuestionCommentsRepository {
  constructor(private prisma: PrismaService) {}

  async findBySlug(slug: string): Promise<Question | null> {}
  async findManyRecent(params: PaginationParams): Promise<Question[]> {}
  async save(question: Question): Promise<void> {}
  async create(questionComment: QuestionComment): Promise<void> {}
  async delete(questionComment: QuestionComment): Promise<void> {}
  async findById(id: string): Promise<QuestionComment | null> {}
  async findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]> {}
}
