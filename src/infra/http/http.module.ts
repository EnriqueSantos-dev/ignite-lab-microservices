import { Module } from '@nestjs/common';
import {
  SendNotificationUseCase,
  CancelNotificationUseCase,
  CounterRecipientNotificationUseCase,
  GetRecipientNotificationUseCase,
  ReadNotificationUseCase,
  UnreadNotificationUseCase,
} from '@/application/use-cases/Notification';
import { DataBaseModule } from '../database/database.module';
import { NotificationController } from './controllers';

@Module({
  imports: [DataBaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotificationUseCase,
    CounterRecipientNotificationUseCase,
    GetRecipientNotificationUseCase,
    CancelNotificationUseCase,
    UnreadNotificationUseCase,
    ReadNotificationUseCase,
  ],
})
export class HttpModule {}
