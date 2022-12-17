import { Notification } from '@/domain/entities/Notification.entity';

export class NotificationViewModel {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt?.toISOString(),
      createdAt: notification.createdAt?.toISOString(),
      canceledAt: notification.canceledAt?.toISOString(),
    };
  }
}
