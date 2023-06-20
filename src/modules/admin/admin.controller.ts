import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
    ISuccessListRespone,
    ISuccessRespone,
} from 'src/common/respone/interface';
import {
    AdminDto,
    CreateAdminDto,
    LoginAdminDto,
    UpdateAdminDto,
} from './dtos';
import { arrDataToRespone, dataToRespone } from 'src/common/respone/until';
import { JwtAdminGuard, RolesGuard } from './guards';
import { Roles } from './decorator/role.decorator';
import { Role } from 'src/common/enum';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    // auth with admin
    @Post('login')
    async loginAdmin(@Body() loginAdminDto: LoginAdminDto): Promise<any> {
        return this.adminService.loginAdmin(loginAdminDto);
    }

    // admin crud
    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    @Post('create')
    async createAdmin(
        @Body() createAdminDto: CreateAdminDto,
    ): Promise<ISuccessRespone<AdminDto>> {
        const newAdmin = await this.adminService.createAdmin(createAdminDto);

        return dataToRespone(AdminDto)(newAdmin);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    @Patch(':id')
    async updateAdminById(
        @Param('id') id: number,
        @Body() updateAdminDto: UpdateAdminDto,
    ): Promise<ISuccessRespone<AdminDto>> {
        const updateAdmin = await this.adminService.updateAdminById(
            id,
            updateAdminDto,
        );

        return dataToRespone(AdminDto)(updateAdmin);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    @Patch('/delete/:id')
    async softDeleteAdminById(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<AdminDto>> {
        const admin = await this.adminService.softDeleteAdminById(id);

        return dataToRespone(AdminDto)(admin);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    @Patch('/restore/:id')
    async restoreAdminById(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<AdminDto>> {
        const restoreAdmin = await this.adminService.restoreAdminById(id);

        return dataToRespone(AdminDto)(restoreAdmin);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    @Delete('/destroy/:id')
    async destoyAdminById(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<any>> {
        const destroyAdmin = await this.adminService.destroyAdminById(id);

        return {
            message: 'success',
            data: destroyAdmin,
        };
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    @Get()
    async getAllAdmin(): Promise<ISuccessListRespone<AdminDto>> {
        const allAdmin = await this.adminService.findAllAdmin();

        return arrDataToRespone(AdminDto)(allAdmin, allAdmin.length);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    @Get('/trash')
    async getAllDeleteAdmin(): Promise<ISuccessListRespone<AdminDto>> {
        const allDeleteAdmin = await this.adminService.findAllDeleteAdmin();

        return arrDataToRespone(AdminDto)(
            allDeleteAdmin,
            allDeleteAdmin.length,
        );
    }
}
