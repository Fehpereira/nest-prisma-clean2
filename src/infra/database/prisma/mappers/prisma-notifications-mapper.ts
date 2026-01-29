import { Notification } from '../../../../domain/notification/enterprise/entities/notification.js';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';
import { Notification as PrismaNotification } from '../../../../generated/prisma/client.js';
import { Prisma } from '@/generated/prisma/browser.js';

export class PrismaNotificationMapper {
  static toDomain(raw: PrismaNotification): Notification {
    return Notification.create(
      {
        title: raw.title,
        content: raw.content,
        recipientId: new UniqueEntityId(raw.recipientId),
        readAt: raw.readAt,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(raw: Notification): Prisma.NotificationUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      recipientId: raw.recipientId.toString(),
      title: raw.title,
      content: raw.content,
      createdAt: raw.createdAt,
      readAt: raw.readAt,
    };
  }
}
