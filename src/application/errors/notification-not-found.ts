export class NotificationNotFoundError extends Error {
  constructor() {
    super('Notificação não encontrada');
    this.stack = 'NotificationNotFoundError';
  }
}
