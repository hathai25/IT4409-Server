import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Slider } from './slider.entity';
import { Repository } from 'typeorm';
import { CreateSliderDto } from './dto/create-slider.dto';
import { ModifyShowDto, UpdateSliderDto } from './dto';

@Injectable()
export class SlidersService {
    constructor(
        @InjectRepository(Slider)
        private readonly sliderRepository: Repository<Slider>,
    ) {}

    async CreateSlider(
        createSliderDto: CreateSliderDto,
        adminId: number,
    ): Promise<Slider> {
        if (!adminId) {
            throw new BadRequestException('not admin id in request');
        }
        const slider = await this.sliderRepository.findOne({
            where: { url: createSliderDto.url },
        });
        if (slider) {
            throw new HttpException(
                'Slider already exists in system',
                HttpStatus.CONFLICT,
            );
        }
        const newSlider = this.sliderRepository.create(createSliderDto);
        newSlider.createdBy = adminId;

        return await this.sliderRepository.save(newSlider);
    }
    async findSliderByUrl(url: string): Promise<Slider> {
        const slider = await this.sliderRepository.findOne({
            where: { url: url },
        });
        if (!slider) {
            throw new NotFoundException('slider is exist in synstom ');
        }
        return slider;
    }

    async updataSliderById(
        id: number,
        updateSliderDto: UpdateSliderDto,
        adminId: number,
    ): Promise<Slider> {
        if (!id || !adminId) {
            throw new BadRequestException(
                ' not id slider or id admin in request',
            );
        }
        const currSlider = await this.sliderRepository.findOne({
            where: { id: id },
        });
        if (!currSlider) {
            throw new NotFoundException('slider not found');
        }
        if (updateSliderDto.url) {
            const findSlider = await this.sliderRepository.findOne({
                where: { url: updateSliderDto.url },
            });
            if (findSlider) {
                throw new BadRequestException(
                    'url is exist in the slider repository',
                );
            }
        }
        const updateSlider = await this.sliderRepository.save({
            ...currSlider,
            ...updateSliderDto,
            updatedBy: adminId,
        });

        return updateSlider;
    }

    async deleteSliderById(id: number): Promise<any> {
        try {
            const deleteSlider = await this.sliderRepository.delete({ id: id });
            return deleteSlider;
        } catch (e) {
            throw new HttpException(
                'have error to delete slider',
                HttpStatus.BAD_REQUEST,
                { cause: e },
            );
        }
    }

    async findSliderById(id: number): Promise<Slider> {
        const slider = await this.sliderRepository.findOne({
            where: { id: id },
        });
        if (!slider) {
            throw new NotFoundException('not found slider with id ' + id);
        }
        return slider;
    }

    async getAllSliderForAdmin(): Promise<Slider[]> {
        const sliders = await this.sliderRepository.find({
            select: {
                createdBy: { email: true, id: true },
                updatedBy: { email: true, id: true },
            },
            relations: { createdBy: true, updatedBy: true },
        });
        return sliders;
    }

    async getAllSliderForClient(): Promise<Slider[]> {
        const sliders = await this.sliderRepository.find({
            where: { isShow: true },
        });
        return sliders;
    }

    async updateShowSliderById(
        id: number,
        modifyShowDto: ModifyShowDto,
        adminId: number,
    ): Promise<Slider> {
        const currSlider = await this.sliderRepository.findOne({
            where: { id: id },
        });
        if (!currSlider) {
            throw new NotFoundException('not found slider with id: ' + id);
        }
        currSlider.isShow = modifyShowDto.isShow;
        currSlider.updatedBy = adminId;
        return await this.sliderRepository.save(currSlider);
    }
}
