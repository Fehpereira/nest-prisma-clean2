import { Either, left, right } from 'src/core/either.js';
import { Notification } from '../../enterprise/entities/notification.js';
import type { NotificationsRepository } from '../repositories/notifications-repository.js';
import { NotAllowedError } from 'src/core/errors/errors/not-allowed-error.js';
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error.js';
interface ReadNotificationUseCaseRequest {
  recipientId: string;
  notificationId: string;
}

type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification;
  }
>;

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    notificationId,
    recipientId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId);

    if (notification?.recipientId.toString() !== recipientId) {
      return left(new NotAllowedError());
    }

    notification.read();

    await this.notificationsRepository.save(notification);

    return right({
      notification,
    });
  }
}
