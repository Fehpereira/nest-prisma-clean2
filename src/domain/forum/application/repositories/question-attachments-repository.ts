import { Injectable } from '@nestjs/common';
import type { QuestionAttachment } from '../../enterprise/entities/question-attachment.js';

@Injectable()
export abstract class QuestionAttachmentsRepository {
  abstract findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]>;
  abstract deleteManyByQuestionId(questionId: string): Promise<void>;
}
