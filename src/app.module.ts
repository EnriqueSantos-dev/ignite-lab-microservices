import { Module } from '@nestjs/common';
import { DataBaseModule } from '@/infra/database/database.module';
import { HttpModule } from '@/infra/http/http.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

@Module({
  imports: [HttpModule, DataBaseModule],
  providers: [PrismaService],
})
export class AppModule {}
