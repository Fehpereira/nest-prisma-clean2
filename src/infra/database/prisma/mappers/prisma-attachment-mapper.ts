import {
  Prisma,
  Attachment as PrismaAttachment,
} from '@/generated/prisma/browser.js';
import { Attachment } from '../../../../domain/forum/enterprise/entities/attachment.js';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';

export class PrismaAttachmentMapper {
  static toDomain(raw: PrismaAttachment): Attachment {
    return Attachment.create(
      {
        title: raw.title,
        url: raw.url,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(raw: Attachment): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      title: raw.title,
      url: raw.url,
    };
  }
}
