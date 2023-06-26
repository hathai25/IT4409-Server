import { Module } from '@nestjs/common';
import { MediasController } from './medias.controller';
import { MediasService } from './medias.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './media.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Media])],
    controllers: [MediasController],
    providers: [MediasService],
    exports: [MediasService],
})
export class MediasModule {}
