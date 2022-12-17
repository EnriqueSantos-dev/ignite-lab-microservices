import { makeNotification } from '@/tests/factories/notification.factory';
import { InMemoryNotificationsRepository } from '@/tests/repositories/in-memory/notifications-repository-in-memory';
import { NotificationNotFoundError } from '@/application/errors';
import { UnreadNotificationUseCase } from './unread-notification.use-case';

const makeSut = () => {
  const inMemoryNotificationsRepositoryInMemory =
    new InMemoryNotificationsRepository();
  const unreadNotificationUseCase = new UnreadNotificationUseCase(
    inMemoryNotificationsRepositoryInMemory,
  );

  return {
    inMemoryNotificationsRepositoryInMemory,
    unreadNotificationUseCase,
  };
};

describe('Unread Notification ', () => {
  it('should be able unread notification', async () => {
    const {
      inMemoryNotificationsRepositoryInMemory,
      unreadNotificationUseCase,
    } = makeSut();

    const notification = makeNotification({
      readAt: new Date(),
    });

    await inMemoryNotificationsRepositoryInMemory.create(notification);

    await unreadNotificationUseCase.execute({
      notificationId: notification.id,
    });

    const notificationIsCancel =
      inMemoryNotificationsRepositoryInMemory.notifications[0].readAt;

    expect(notificationIsCancel).toBeNull();
  });

  it('should throw error if notification not exist', async () => {
    const { unreadNotificationUseCase } = makeSut();

    const notificationId = 'any';

    expect(() =>
      unreadNotificationUseCase.execute({
        notificationId,
      }),
    ).rejects.toBeInstanceOf(NotificationNotFoundError);
  });
});
