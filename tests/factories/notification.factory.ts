import {
  CreateNotificationProps,
  Notification,
} from '@/domain/entities/Notification.entity';
import { Content } from '@/domain/value-objects';

type Override = Partial<CreateNotificationProps>;

export function makeNotification(overrides?: Override) {
  return new Notification({
    content: new Content('any content'),
    category: 'any-category',
    recipientId: 'any-recipient',
    ...overrides,
  });
}
