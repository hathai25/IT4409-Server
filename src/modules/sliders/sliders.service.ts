import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Slider } from './slider.entity';
import { Repository } from 'typeorm';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto';

@Injectable()
export class SlidersService {
    constructor(
        @InjectRepository(Slider)
        private readonly sliderRepository: Repository<Slider>,
    ) {}

    async CreateSlider(createSliderDto: CreateSliderDto): Promise<Slider> {
        const slider = await this.sliderRepository.findOne({
            where: { url: createSliderDto.url },
        });
        if (slider) {
            throw new HttpException(
                'Slider already exists in system',
                HttpStatus.CONFLICT,
            );
        }
        const newSlider = await this.sliderRepository.save(createSliderDto);
        return newSlider;
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
    ): Promise<Slider> {
        const currSlider = await this.sliderRepository.findOne({
            where: { id: id },
        });
        if (!currSlider) {
            throw new NotFoundException('slider not found');
        }
        const updateSlider = await this.sliderRepository.save({
            ...currSlider,
            ...updateSliderDto,
        });

        return updateSlider;
    }

    async deleteSliderById(id: number): Promise<any> {
        try {
            const deleteSlider = await this.sliderRepository.delete({ id: id });
            return deleteSlider;
        } catch (e) {
            throw new HttpException(
                'have error to delete media',
                HttpStatus.BAD_REQUEST,
                { cause: e },
            );
        }
    }

    async findSliderById(id: number): Promise<Slider> {
        const slider = await this.sliderRepository.findOne({ where: { id: id } });
        if (slider) {
            throw new NotFoundException('not found slider with id ' + id);
        }
        return slider;
    }

    async getAllSlider() {
        return await this.sliderRepository.find();
    }






}
