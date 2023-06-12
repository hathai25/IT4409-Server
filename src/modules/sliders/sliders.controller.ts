import {
    Body,
    Controller,
    Param,
    Patch,
    Post,
    Delete,
    Get,
} from '@nestjs/common';
import { ISuccessRespone } from 'src/common/respone/interface';
import { dataToRespone } from 'src/common/respone/until';
import { SlidersService } from './sliders.service';
import { CreateSliderDto, SliderDto, UpdateSliderDto } from './dto';

@Controller('sliders')
export class SlidersController {
    constructor(private readonly slidersService : SlidersService ) {}

    @Post()
    async createSlider(
       @Body() createSliderDto: CreateSliderDto,
    ): Promise<ISuccessRespone<SliderDto>> {
        const newSlider = await this.slidersService.CreateSlider(createSliderDto);
        return dataToRespone(SliderDto)(newSlider);
    }
    @Patch(':id')
    async updateSliderById(
        id: number,
        updateSliderDto: UpdateSliderDto,
    ): Promise<ISuccessRespone<SliderDto>> {
        const updateSlider= await this.slidersService.updataSliderById(
            id,
            updateSliderDto,
        );
        return dataToRespone(SliderDto)(updateSlider);
    }

    @Delete(':id')
    async deleteSliderById(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<SliderDto>> {
        const deleteSlider = await this.slidersService.deleteSliderById(id);
        return dataToRespone(SliderDto)(deleteSlider);
    }

    @Get(':id')
    async getSliderById(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<SliderDto>> {
        const slider = await this.slidersService.findSliderById(id);
        return dataToRespone(SliderDto)(slider);
    }
    @Get()
    async getAllSliders(): Promise<ISuccessRespone<SliderDto>> {
        const sliders = await this.slidersService.getAllSlider();
        return dataToRespone(SliderDto)(sliders);
    }







}
