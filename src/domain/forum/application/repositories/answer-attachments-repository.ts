import { Injectable } from '@nestjs/common';
import type { AnswerAttachment } from '../../enterprise/entities/answer-attachment.js';

@Injectable()
export abstract class AnswerAttachmentsRepository {
  abstract findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>;
  abstract deleteManyByAnswerId(answerId: string): Promise<void>;
}
