import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './media.entity';
import { Repository } from 'typeorm';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto';

@Injectable()
export class MediasService {
    constructor(
        @InjectRepository(Media)
        private readonly mediaRepository: Repository<Media>,
    ) {}

    async CreateMedias(createMediaDto: CreateMediaDto): Promise<Media> {
        const newMedia = this.mediaRepository.create(createMediaDto);
        return await this.mediaRepository.save(newMedia);
    }

    async findMediaByUrl(url: string): Promise<Media> {
        const media = await this.mediaRepository.findOne({
            where: { url: url },
        });
        if (!media) {
            throw new NotFoundException('media is exist in system ');
        }
        return media;
    }

    async updataMediaById(
        id: number,
        updateMediaDto: UpdateMediaDto,
    ): Promise<Media> {
        const currMedia = await this.mediaRepository.findOne({
            where: { id: id },
        });
        if (!currMedia) {
            throw new NotFoundException('Media not found');
        }
        const updateMedia = await this.mediaRepository.save({
            ...currMedia,
            ...updateMediaDto,
        });

        return updateMedia;
    }

    async deleteMediaById(id: number): Promise<any> {
        try {
            const deleteMedia = await this.mediaRepository.delete({ id: id });
            return deleteMedia;
        } catch (e) {
            throw new HttpException(
                'have error to delete media',
                HttpStatus.BAD_REQUEST,
                { cause: e },
            );
        }
    }

    async findMediaById(id: number): Promise<Media> {
        const media = await this.mediaRepository.findOne({ where: { id: id } });
        if (!media) {
            throw new NotFoundException('not found media with id ' + id);
        }
        return media;
    }

    async getAllMedia() {
        return await this.mediaRepository.find();
    }
}
