import { makeNotification } from '@/tests/factories/notification.factory';
import { InMemoryNotificationsRepository } from '@/tests/repositories/in-memory/notifications-repository-in-memory';
import { NotificationNotFoundError } from '@/application/errors';
import { ReadNotificationUseCase } from './read-notification.use-case';

const makeSut = () => {
  const inMemoryNotificationsRepositoryInMemory =
    new InMemoryNotificationsRepository();
  const readNotificationUseCase = new ReadNotificationUseCase(
    inMemoryNotificationsRepositoryInMemory,
  );

  return {
    inMemoryNotificationsRepositoryInMemory,
    readNotificationUseCase,
  };
};

describe('Read Notification', () => {
  it('should be able read notification', async () => {
    const { inMemoryNotificationsRepositoryInMemory, readNotificationUseCase } =
      makeSut();

    const notification = makeNotification();

    await inMemoryNotificationsRepositoryInMemory.create(notification);

    await readNotificationUseCase.execute({
      notificationId: notification.id,
    });

    const notificationIsCancel =
      inMemoryNotificationsRepositoryInMemory.notifications[0].readAt;

    expect(notificationIsCancel).toEqual(expect.any(Date));
  });

  it('should throw error if notification not exist', async () => {
    const { readNotificationUseCase } = makeSut();

    const notificationId = 'any';

    expect(() =>
      readNotificationUseCase.execute({
        notificationId,
      }),
    ).rejects.toBeInstanceOf(NotificationNotFoundError);
  });
});
