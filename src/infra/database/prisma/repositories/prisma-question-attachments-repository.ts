import { Injectable } from '@nestjs/common';
import { QuestionAttachmentsRepository } from '../../../../domain/forum/application/repositories/question-attachments-repository.js';
import { QuestionAttachment } from '../../../../domain/forum/enterprise/entities/question-attachment.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class PrismaQuestionAttachmentsRepository implements QuestionAttachmentsRepository {
  constructor(private prisma: PrismaService) {}

  async deleteManyByQuestionId(questionId: string): Promise<void> {}
  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    throw new Error('Method not implanted');
  }
}
