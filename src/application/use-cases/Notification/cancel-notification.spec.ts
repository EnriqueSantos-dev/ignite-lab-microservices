import { makeNotification } from '@/tests/factories/notification.factory';
import { InMemoryNotificationsRepository } from '@/tests/repositories/in-memory/notifications-repository-in-memory';
import { NotificationNotFoundError } from '@/application/errors';
import { CancelNotificationUseCase } from './cancel-notification.use-case';

const makeSut = () => {
  const inMemoryNotificationsRepositoryInMemory =
    new InMemoryNotificationsRepository();
  const cancelNotificationUseCase = new CancelNotificationUseCase(
    inMemoryNotificationsRepositoryInMemory,
  );

  return {
    inMemoryNotificationsRepositoryInMemory,
    cancelNotificationUseCase,
  };
};

describe('Cancel Notification', () => {
  it('should be able cancel notification', async () => {
    const {
      cancelNotificationUseCase,
      inMemoryNotificationsRepositoryInMemory,
    } = makeSut();

    const notification = makeNotification();

    await inMemoryNotificationsRepositoryInMemory.create(notification);

    await cancelNotificationUseCase.execute({
      notificationId: notification.id,
    });

    const notificationIsCancel =
      inMemoryNotificationsRepositoryInMemory.notifications[0].canceledAt;

    expect(notificationIsCancel).toEqual(expect.any(Date));
  });

  it('should throw error if notification not exist', async () => {
    const { cancelNotificationUseCase } = makeSut();

    const notificationId = 'any';

    expect(() =>
      cancelNotificationUseCase.execute({
        notificationId,
      }),
    ).rejects.toBeInstanceOf(NotificationNotFoundError);
  });
});
