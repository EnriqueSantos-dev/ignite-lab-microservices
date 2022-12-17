import { Notification } from '@/domain/entities/Notification.entity';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@/application/repositories/notifications.repository';

interface GetRecipientNotificationsUseCaseInput {
  recipientId: string;
}

interface GetRecipientNotificationsUseCaseOutput {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationsRepository,
  ) {}

  async execute({
    recipientId,
  }: GetRecipientNotificationsUseCaseInput): Promise<GetRecipientNotificationsUseCaseOutput> {
    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
