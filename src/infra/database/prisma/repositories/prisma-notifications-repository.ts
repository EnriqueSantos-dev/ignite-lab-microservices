import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@/application/repositories/notifications.repository';
import { Notification } from '@/domain/entities/Notification.entity';
import { PrismaNotificationMapper } from '../mappers';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const data = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (data) {
      return PrismaNotificationMapper.toEntity(data);
    }

    return null;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const data = await this.prisma.notification.findMany({
      where: { recipientId },
    });

    return data.map(PrismaNotificationMapper.toEntity);
  }

  async counterManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: { recipientId },
    });

    return count;
  }

  async save(notification: Notification): Promise<void> {
    await this.prisma.notification.update({
      where: { id: notification.id },
      data: PrismaNotificationMapper.toPrisma(notification),
    });
  }

  async create(notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification),
    });
  }
}
