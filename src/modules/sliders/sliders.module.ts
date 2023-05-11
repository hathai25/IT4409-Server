import { Module } from '@nestjs/common';
import { SlidersController } from './sliders.controller';
import { SlidersService } from './sliders.service';

@Module({
    controllers: [SlidersController],
    providers: [SlidersService],
})
export class SlidersModule {}
