import { Module } from '@nestjs/common';
import { SlidersController } from './sliders.controller';
import { SlidersService } from './sliders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slider } from './slider.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Slider])],
    controllers: [SlidersController],
    providers: [SlidersService],
})
export class SlidersModule {}
