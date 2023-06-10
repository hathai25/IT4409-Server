import { Slider } from './slider.entity';
import { Module } from '@nestjs/common';
import { SlidersController } from './sliders.controller';
import { SlidersService } from './sliders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports: [TypeOrmModule.forFeature([Slider])],
    controllers: [SlidersController],
    providers: [SlidersService],
    exports: [SlidersService],
})
export class SlidersModule {}
