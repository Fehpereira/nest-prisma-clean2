import { Prisma } from '@/generated/prisma/browser.js';
import { Attachment } from '../../../../domain/forum/enterprise/entities/attachment.js';

export class PrismaAttachmentMapper {
  static toPrisma(raw: Attachment): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      title: raw.title,
      url: raw.url,
    };
  }
}
