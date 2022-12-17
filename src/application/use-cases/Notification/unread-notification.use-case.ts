import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@/application/repositories/notifications.repository';
import { NotificationNotFoundError } from '@/application/errors';

interface UnreadNotificationInput {
  notificationId: string;
}

type UnreadNotificationOutput = void;

@Injectable()
export class UnreadNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    input: UnreadNotificationInput,
  ): Promise<UnreadNotificationOutput> {
    const { notificationId } = input;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) throw new NotificationNotFoundError();

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
