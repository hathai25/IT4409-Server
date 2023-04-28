import { Module } from '@nestjs/common';
import { TransationsService } from './transactions.service';
import { TransationsController } from './transactions.controller';

@Module({
  providers: [TransationsService],
  controllers: [TransationsController]
})
export class TransationsModule {}
