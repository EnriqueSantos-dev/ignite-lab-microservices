import { makeNotification } from '@/tests/factories/notification.factory';
import { InMemoryNotificationsRepository } from '@/tests/repositories/in-memory/notifications-repository-in-memory';
import { GetRecipientNotificationUseCase } from './get-recipient-notifications.use-case';

const makeSut = () => {
  const inMemoryNotificationsRepositoryInMemory =
    new InMemoryNotificationsRepository();
  const getRecipientNotificationUseCase = new GetRecipientNotificationUseCase(
    inMemoryNotificationsRepositoryInMemory,
  );

  return {
    inMemoryNotificationsRepositoryInMemory,
    getRecipientNotificationUseCase,
  };
};

describe('Counter recipient Notification', () => {
  it('should be able get recipient notifications', async () => {
    const {
      inMemoryNotificationsRepositoryInMemory,
      getRecipientNotificationUseCase,
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

    const { notifications } = await getRecipientNotificationUseCase.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
