import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNotificationDto } from '../dtos';
import { NotificationViewModel } from '../view-models';
import { Patch } from '@nestjs/common';
import { Param } from '@nestjs/common';
import {
  CancelNotificationUseCase,
  CounterRecipientNotificationUseCase,
  GetRecipientNotificationUseCase,
  ReadNotificationUseCase,
  SendNotificationUseCase,
  UnreadNotificationUseCase,
} from '@/application/use-cases/Notification';

@Controller('api/v1/notifications')
export class NotificationController {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
    private readonly cancelNotificationUseCase: CancelNotificationUseCase,
    private readonly countNotificationsUseCase: CounterRecipientNotificationUseCase,
    private readonly readNotificationUseCase: ReadNotificationUseCase,
    private readonly unreadNotificationUseCase: UnreadNotificationUseCase,
    private readonly getNotificationUseCase: GetRecipientNotificationUseCase,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param() params: { id: string }) {
    const { id } = params;

    await this.cancelNotificationUseCase.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipients(@Param() params: { recipientId: string }) {
    const { recipientId } = params;

    const { count } = await this.countNotificationsUseCase.execute({
      recipientId,
    });

    return { count: count };
  }

  @Patch(':id/read')
  async readFromRecipient(@Param() params: { id: string }) {
    const { id } = params;

    await this.readNotificationUseCase.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unreadFromRecipient(@Param() params: { id: string }) {
    const { id } = params;

    await this.unreadNotificationUseCase.execute({ notificationId: id });
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param() params: { recipientId: string }) {
    const { recipientId } = params;

    const { notifications } = await this.getNotificationUseCase.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHttp) };
  }

  @Post()
  async create(@Body() body: CreateNotificationDto): Promise<any> {
    const { category, content, recipientId } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      category,
      content,
      recipientId,
    });

    return { notification: NotificationViewModel.toHttp(notification) };
  }
}
