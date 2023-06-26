import { Module } from '@nestjs/common';
import { CategorysController } from './categorys.controller';
import { CategorysService } from './categorys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategorysController],
    providers: [CategorysService],
    exports: [CategorysService],
})
export class CategorysModule {}
