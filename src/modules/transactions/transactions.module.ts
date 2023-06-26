import { Module } from '@nestjs/common';
import { TransationsService } from './transactions.service';
import { TransationsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction])],
    providers: [TransationsService],
    controllers: [TransationsController],
    exports: [TransationsService],
})
export class TransationsModule {}
