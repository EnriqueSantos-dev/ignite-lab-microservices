import { NotificationsRepository } from '@/application/repositories/notifications.repository';
import { Notification } from '@/domain/entities/Notification.entity';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (notification) => notification.id === notificationId,
    );

    return notification ?? null;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }

  async counterManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }

  async save(notification: Notification): Promise<void> {
    this.notifications.map((n) => {
      if (n.id === notification.id) {
        return Object.assign(n, notification);
      }
    });
  }

  create(notification: Notification): Promise<void> {
    this.notifications.push(notification);

    return Promise.resolve();
  }
}
