import { Injectable } from '@nestjs/common';
import type { QuestionAttachment } from '../../enterprise/entities/question-attachment.js';

@Injectable()
export abstract class QuestionAttachmentsRepository {
  abstract createMany(attachments: QuestionAttachment[]): Promise<void>;
  abstract deleteMany(attachments: QuestionAttachment[]): Promise<void>;

  abstract findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]>;
  
  abstract deleteManyByQuestionId(questionId: string): Promise<void>;
}
