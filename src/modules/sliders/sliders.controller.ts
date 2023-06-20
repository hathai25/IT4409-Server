import {
    Body,
    Controller,
    Param,
    Patch,
    Post,
    Delete,
    Get,
    UseGuards,
    Req,
} from '@nestjs/common';
import {
    ISuccessListRespone,
    ISuccessRespone,
} from 'src/common/respone/interface';
import { arrDataToRespone, dataToRespone } from 'src/common/respone/until';
import { SlidersService } from './sliders.service';
import {
    CreateSliderDto,
    ModifyShowDto,
    SliderDto,
    UpdateSliderDto,
} from './dto';
import { JwtAdminGuard, RolesGuard } from '../admin/guards';
import { Roles } from '../admin/decorator/role.decorator';
import { Role } from 'src/common/enum';

@Controller('sliders')
export class SlidersController {
    constructor(private readonly slidersService: SlidersService) {}

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManagePage)
    @Post()
    async createSlider(
        @Body() createSliderDto: CreateSliderDto,
        @Req() req: any,
    ): Promise<ISuccessRespone<SliderDto>> {
        const newSlider = await this.slidersService.CreateSlider(
            createSliderDto,
            req?.user.adminId,
        );
        return dataToRespone(SliderDto)(newSlider);
    }

    // chỉnh trạng thái slider có hiển thị hay không
    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManagePage)
    @Patch('show/:id')
    async modifyShowSliderById(
        @Param('id') id: number,
        @Body() modifyShowDto: ModifyShowDto,
        @Req() req: any,
    ): Promise<ISuccessRespone<SliderDto>> {
        const updateSlider = await this.slidersService.updataSliderById(
            id,
            modifyShowDto,
            req?.user?.adminId,
        );
        return dataToRespone(SliderDto)(updateSlider);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManagePage)
    @Patch(':id')
    async updateSliderById(
        @Param() id: number,
        @Body() updateSliderDto: UpdateSliderDto,
        @Req() req: any,
    ): Promise<ISuccessRespone<SliderDto>> {
        const updateSlider = await this.slidersService.updataSliderById(
            id,
            updateSliderDto,
            req?.user.adminId,
        );
        return dataToRespone(SliderDto)(updateSlider);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManagePage)
    @Delete(':id')
    async deleteSliderById(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<SliderDto>> {
        const deleteSlider = await this.slidersService.deleteSliderById(id);
        return dataToRespone(SliderDto)(deleteSlider);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManagePage)
    @Get('management')
    async getAllSlidersForAdmin(): Promise<ISuccessListRespone<SliderDto>> {
        const sliders = await this.slidersService.getAllSliderForAdmin();
        return arrDataToRespone(SliderDto)(sliders, sliders.length);
    }

    @Get()
    async getAllSlidersForClient(): Promise<ISuccessListRespone<SliderDto>> {
        const sliders = await this.slidersService.getAllSliderForClient();
        return arrDataToRespone(SliderDto)(sliders, sliders.length);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManagePage)
    @Get(':id')
    async getSliderById(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<SliderDto>> {
        const slider = await this.slidersService.findSliderById(id);
        return dataToRespone(SliderDto)(slider);
    }
}
