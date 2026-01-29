import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { PrismaNotificationMapper } from '../mappers/prisma-notifications-mapper.js';
import { NotificationsRepository } from '../../../../domain/notification/application/repositories/notifications-repository.js';
import { Notification } from '../../../../domain/notification/enterprise/entities/notification.js';

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async save(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.create({
      data,
    });
  }
}
