import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository.js';
import { Attachment } from '@/domain/forum/enterprise/entities/attachment.js';

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  items: Attachment[] = [];

  async create(attachment: Attachment): Promise<void> {
    this.items.push(attachment);
  }
}
