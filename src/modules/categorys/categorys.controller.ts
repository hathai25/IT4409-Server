import {
    Controller,
    UseGuards,
    Get,
    Req,
    Post,
    Body,
    BadRequestException,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { JwtAdminGuard, RolesGuard } from '../admin/guards';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import {
    ISuccessListRespone,
    ISuccessRespone,
} from 'src/common/respone/interface';
import { CategoryDto } from './dtos/category.dto';
import { arrDataToRespone, dataToRespone } from 'src/common/respone/until';
import { Roles } from '../admin/decorator/role.decorator';
import { Role } from 'src/common/enum';

@Controller('categories')
export class CategorysController {
    constructor(private readonly categorysService: CategorysService) {}

    @Get()
    async getCategories(): Promise<ISuccessListRespone<CategoryDto>> {
        const categories = await this.categorysService.findAllCategory();
        return arrDataToRespone(CategoryDto)(categories, categories.length);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManagePage)
    @Post()
    async createCategory(
        @Body() createCategory: CreateCategoryDto,
        @Req() req: any,
    ): Promise<ISuccessRespone<CategoryDto>> {
        if (!req?.user?.adminId) {
            throw new BadRequestException('not admin id in the request');
        }
        const newCategory = await this.categorysService.createCategory(
            createCategory,
            req?.user?.adminId,
        );
        return dataToRespone(CategoryDto)(newCategory);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManagePage)
    @Patch(':id')
    async updateCategory(
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Req() req: any,
        @Param('id') id: number,
    ): Promise<ISuccessRespone<CategoryDto>> {
        if (!req.user.adminId) {
            throw new BadRequestException('not admin id in the request');
        }
        const updateCategory = await this.categorysService.updateCategoryById(
            updateCategoryDto,
            id,
            req.user.adminId,
        );
        return dataToRespone(CategoryDto)(updateCategory);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManagePage)
    @Delete(':id')
    async destroyCategoryById(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<CategoryDto>> {
        const destroyCategory = await this.categorysService.destroyCategoryById(
            id,
        );
        return dataToRespone(CategoryDto)(destroyCategory);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManagePage)
    @Patch('trash/:id')
    async softDeleteCategory(
        @Param('id') id: number,
        @Req() req: any,
    ): Promise<ISuccessRespone<CategoryDto>> {
        if (!req.user.adminId) {
            throw new BadRequestException('not admin id in the request');
        }
        const deleteCategory =
            await this.categorysService.softDeleteCategoryById(
                id,
                req.user.adminId,
            );
        return dataToRespone(CategoryDto)(deleteCategory);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManagePage)
    @Patch('trash/restore/:id')
    async recoveryCategoryById(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<CategoryDto>> {
        const recoveryCategory =
            await this.categorysService.restoreSoftDeleteCategoryById(id);
        return dataToRespone(CategoryDto)(recoveryCategory);
    }
}
