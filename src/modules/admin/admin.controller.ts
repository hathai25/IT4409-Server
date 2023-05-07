import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ISuccessRespone } from 'src/common/respone/interface';
import { AdminDto, CreateAdminDto, LoginAdminDto } from './dtos';
import { dataToRespone } from 'src/common/respone/until';
import { JwtAdminGuard, RolesGuard } from './guards';
import { Roles } from './decorator/role.decorator';
import { Role } from 'src/common/enum';


@Controller('admin')
export class AdminController {
    constructor( private readonly adminService: AdminService) {}

    // auth with admin
    @Post('create')
    async createAdmin(@Body() createAdminDto: CreateAdminDto): Promise<ISuccessRespone<AdminDto>> {
        const newAdmin = await this.adminService.createAdmin(createAdminDto)

        return dataToRespone(AdminDto)(newAdmin)
    }

    @Post('login')
    async loginAdmin(@Body() loginAdminDto: LoginAdminDto): Promise<any> {
        return this.adminService.loginAdmin(loginAdminDto)
    }

    // admin crud
    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get('me')
    async getMe(@Req() req) {
        return req.user
    }
}
