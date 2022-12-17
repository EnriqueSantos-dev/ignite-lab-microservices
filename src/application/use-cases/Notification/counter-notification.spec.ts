import { makeNotification } from '@/tests/factories/notification.factory';
import { InMemoryNotificationsRepository } from '@/tests/repositories/in-memory/notifications-repository-in-memory';
import { CounterRecipientNotificationUseCase } from './counter-recipient-notification.use-case';

const makeSut = () => {
  const inMemoryNotificationsRepositoryInMemory =
    new InMemoryNotificationsRepository();
  const counterRecipientNotificationUseCase =
    new CounterRecipientNotificationUseCase(
      inMemoryNotificationsRepositoryInMemory,
    );

  return {
    inMemoryNotificationsRepositoryInMemory,
    counterRecipientNotificationUseCase,
  };
};

describe('Counter recipient Notification', () => {
  it('should be able count recipient notification', async () => {
    const {
      inMemoryNotificationsRepositoryInMemory,
      counterRecipientNotificationUseCase,
    } = makeSut();

    await inMemoryNotificationsRepositoryInMemory.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );

    await inMemoryNotificationsRepositoryInMemory.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );

    await inMemoryNotificationsRepositoryInMemory.create(
      makeNotification({
        recipientId: 'recipient-2',
      }),
    );

    const { count: countRecipientOne } =
      await counterRecipientNotificationUseCase.execute({
        recipientId: 'recipient-1',
      });

    expect(countRecipientOne).toEqual(2);
  });
});
