import { InMemoryNotificationsRepository } from '@/tests/repositories/in-memory/notifications-repository-in-memory';

import { SendNotificationUseCase } from './send-notification.use-case';

const makeSut = () => {
  const inMemoryNotificationsRepositoryInMemory =
    new InMemoryNotificationsRepository();
  const sendNotificationUseCase = new SendNotificationUseCase(
    inMemoryNotificationsRepositoryInMemory,
  );

  return { inMemoryNotificationsRepositoryInMemory, sendNotificationUseCase };
};

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const { inMemoryNotificationsRepositoryInMemory, sendNotificationUseCase } =
      makeSut();

    const { notification } = await sendNotificationUseCase.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'any_recipient_id',
    });

    const notificationsLength =
      inMemoryNotificationsRepositoryInMemory.notifications.length;

    expect(notificationsLength).toBeGreaterThan(0);
    expect(inMemoryNotificationsRepositoryInMemory.notifications[0]).toEqual(
      notification,
    );
  });
});
