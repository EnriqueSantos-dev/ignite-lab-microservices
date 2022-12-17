import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@/application/repositories/notifications.repository';
import { NotificationNotFoundError } from '@/application/errors';

interface CancelNotificationInput {
  notificationId: string;
}

type CancelNotificationOutput = void;

@Injectable()
export class CancelNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    input: CancelNotificationInput,
  ): Promise<CancelNotificationOutput> {
    const { notificationId } = input;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) throw new NotificationNotFoundError();

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
