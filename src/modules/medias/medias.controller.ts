import {
    Body,
    Controller,
    Param,
    Patch,
    Post,
    Delete,
    Get,
} from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto, MediaDto, UpdateMediaDto } from './dto';
import { ISuccessRespone } from 'src/common/respone/interface';
import { dataToRespone } from 'src/common/respone/until';

@Controller('medias')
export class MediasController {
    constructor(private readonly mediasService: MediasService) {}

    @Post()
    async createMedia(
        @Body() createMediaDto: CreateMediaDto,
    ): Promise<ISuccessRespone<MediaDto>> {
        const newMedia = await this.mediasService.CreateMedias(createMediaDto);
        return dataToRespone(MediaDto)(newMedia);
    }

    @Patch(':id')
    async updateMediaById(
        @Param() id: number,
        @Body() updateMediaDto: UpdateMediaDto,
    ): Promise<ISuccessRespone<MediaDto>> {
        const updateMedia = await this.mediasService.updataMediaById(
            id,
            updateMediaDto,
        );
        return dataToRespone(MediaDto)(updateMedia);
    }

    @Delete(':id')
    async deleteMediaById(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<MediaDto>> {
        const deletMedia = await this.mediasService.deleteMediaById(id);
        return dataToRespone(MediaDto)(deletMedia);
    }

    @Get(':id')
    async getMediaById(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<MediaDto>> {
        const media = await this.mediasService.findMediaById(id);
        return dataToRespone(MediaDto)(media);
    }
}
