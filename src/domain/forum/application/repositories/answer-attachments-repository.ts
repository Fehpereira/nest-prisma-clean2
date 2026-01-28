import { Injectable } from '@nestjs/common';
import type { AnswerAttachment } from '../../enterprise/entities/answer-attachment.js';

@Injectable()
export abstract class AnswerAttachmentsRepository {
  abstract createMany(attachments: AnswerAttachment[]): Promise<void>;
  abstract deleteMany(attachments: AnswerAttachment[]): Promise<void>;
  abstract findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>;
  abstract deleteManyByAnswerId(answerId: string): Promise<void>;
}
