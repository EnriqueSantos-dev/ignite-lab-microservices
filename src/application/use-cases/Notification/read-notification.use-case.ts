import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@/application/repositories/notifications.repository';
import { NotificationNotFoundError } from '@/application/errors';

interface ReadNotificationInput {
  notificationId: string;
}

type ReadNotificationOutput = void;

@Injectable()
export class ReadNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(input: ReadNotificationInput): Promise<ReadNotificationOutput> {
    const { notificationId } = input;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) throw new NotificationNotFoundError();

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
