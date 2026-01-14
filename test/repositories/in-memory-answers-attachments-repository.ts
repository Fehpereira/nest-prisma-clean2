import { AnswerAttachmentsRepository } from "src/domain/forum/application/repositories/answer-attachments-repository.js";
import { AnswerAttachment } from "src/domain/forum/enterprise/entities/answer-attachment.js";

export class InMemoryAnswerAttachmentsRepository implements AnswerAttachmentsRepository {
  items: AnswerAttachment[] = [];

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    );

    return answerAttachments;
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    );

    this.items = answerAttachments;
  }
}
