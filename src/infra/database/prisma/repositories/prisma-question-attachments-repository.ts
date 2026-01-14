import { Injectable } from '@nestjs/common';
import { QuestionAttachmentsRepository } from 'src/domain/forum/application/repositories/question-attachments-repository.js';
import { QuestionAttachment } from 'src/domain/forum/enterprise/entities/question-attachment.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class PrismaQuestionAttachmentsRepository implements QuestionAttachmentsRepository {
  constructor(private prisma: PrismaService) {}

  async deleteManyByQuestionId(questionId: string): Promise<void> {}
  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {}
}
