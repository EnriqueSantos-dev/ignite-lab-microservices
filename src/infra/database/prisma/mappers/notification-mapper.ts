import { Notification } from '@/domain/entities/Notification.entity';
import { Content } from '@/domain/value-objects';
import { Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      recipientId: notification.recipientId,
      content: notification.content.value,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt,
    };
  }

  static toEntity(raw: RawNotification): Notification {
    return new Notification({
      id: raw.id,
      category: raw.category,
      content: new Content(raw.content),
      recipientId: raw.recipientId,
      canceledAt: raw.canceledAt,
      createdAt: raw.createdAt,
      readAt: raw.readAt,
    });
  }
}
