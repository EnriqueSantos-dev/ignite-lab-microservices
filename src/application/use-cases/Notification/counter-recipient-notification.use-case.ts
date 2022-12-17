import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@/application/repositories/notifications.repository';

interface CounterNotificationUseCaseInput {
  recipientId: string;
}

interface CounterNotificationUseCaseOutput {
  count: number;
}

@Injectable()
export class CounterRecipientNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationsRepository,
  ) {}

  async execute({
    recipientId,
  }: CounterNotificationUseCaseInput): Promise<CounterNotificationUseCaseOutput> {
    const count = await this.notificationRepository.counterManyByRecipientId(
      recipientId,
    );

    return { count };
  }
}
