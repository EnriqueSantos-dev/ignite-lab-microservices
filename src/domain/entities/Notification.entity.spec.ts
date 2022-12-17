import { randomUUID } from 'node:crypto';
import { Content } from '../value-objects/content';
import { Notification } from './Notification.entity';

describe('Content value object', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Nova solicitação de notificação'),
      category: 'social',
      recipientId: randomUUID(),
    });

    expect(notification).toBeInstanceOf(Notification);
  });
});
