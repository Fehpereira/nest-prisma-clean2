import { Injectable } from '@nestjs/common';
import { AnswerAttachmentsRepository } from 'src/domain/forum/application/repositories/answer-attachments-repository.js';
import { AnswerAttachment } from 'src/domain/forum/enterprise/entities/answer-attachment.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class PrismaAnswerAttachmentsRepository implements AnswerAttachmentsRepository {
  constructor(private prisma: PrismaService) {}

  async deleteManyByAnswerId(answerId: string): Promise<void> {}
  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {}
}
