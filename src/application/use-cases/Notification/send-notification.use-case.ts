import { Injectable } from '@nestjs/common';
import { Notification } from '@/domain/entities/Notification.entity';
import { Content } from '@/domain/value-objects/content';
import { NotificationsRepository } from '@/application/repositories/notifications.repository';

interface SendNotificationInput {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationOutput {
  notification: Notification;
}

@Injectable()
export class SendNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(input: SendNotificationInput): Promise<SendNotificationOutput> {
    const { category, content, recipientId } = input;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}
