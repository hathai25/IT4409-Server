import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
    ISuccessListRespone,
    ISuccessRespone,
} from 'src/common/respone/interface';
import { UserDto } from './dtos/user/user.dto';
import { arrDataToRespone, dataToRespone } from 'src/common/respone/until';
import { FilterDto, UpdateUserDto } from './dtos/user';
import { JwtAdminGuard, RolesGuard } from '../admin/guards';
import { Roles } from '../admin/decorator/role.decorator';
import { Role } from 'src/common/enum';
import { AddressDto } from './dtos/address/address.dto';
import { AddressService } from './address.service';
import { UpdateAddressDto } from './dtos/address/update-address.dto';
import { CreateAddressDto } from './dtos/address';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly addresService: AddressService,
    ) {}

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    @Get('/get-all')
    async getUsers(
        @Query() filterDto: FilterDto,
    ): Promise<ISuccessListRespone<UserDto>> {
        const users = await this.usersService.findAllUsers(filterDto);
        return arrDataToRespone(UserDto)(users, users.length);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    @Get('/trash/get-all')
    async getSoftDeleteUsers(
        @Query() filterDto: FilterDto,
    ): Promise<ISuccessListRespone<UserDto>> {
        const softDeleteUser = await this.usersService.findAllSoftDeleteUsers(
            filterDto,
        );
        return arrDataToRespone(UserDto)(softDeleteUser, softDeleteUser.length);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    async getProfileUser(@Req() req: any): Promise<ISuccessRespone<UserDto>> {
        if (!req?.user?.userId) {
            throw new BadRequestException('no data id user to get profile');
        }
        const user = await this.usersService.findUserById(req?.user?.userId);
        return dataToRespone(UserDto)(user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/profile')
    async updateUserById(
        @Req() req: any,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<ISuccessRespone<UserDto>> {
        if (!!req?.user?.userId) {
            throw new BadRequestException('no data id user to update');
        }
        const updateUser = await this.usersService.updateUserById(
            req?.user?.userId,
            updateUserDto,
        );
        return dataToRespone(UserDto)(updateUser);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    @Delete('/:id')
    async softDeleteUserById(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<UserDto>> {
        const softDeleteUser = await this.usersService.softDeletUserById(id);
        return dataToRespone(UserDto)(softDeleteUser);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    @Patch('/trash/restore/:id')
    async restoreSoftDeleteUserById(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<UserDto>> {
        const restoreUser = await this.usersService.restoreUserById(id);
        return dataToRespone(UserDto)(restoreUser);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    @Delete('/destroy/:id')
    async DestroyUserById(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<UserDto>> {
        const destroyUser = await this.usersService.destroyUserById(id);
        return dataToRespone(UserDto)(destroyUser);
    }

    //address
    @UseGuards(JwtAuthGuard)
    @Get('/address')
    async getAllAddressByUserId(
        @Req() req: any,
    ): Promise<ISuccessListRespone<AddressDto>> {
        if (!req.user?.userId) {
            throw new BadRequestException(`no data id user in request`);
        }
        const addresses = await this.addresService.findAllAddressByUserId(
            req?.user.userId,
        );
        return arrDataToRespone(AddressDto)(addresses, addresses.length);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/address/:id')
    async updateAddressById(
        @Req() req: any,
        @Param('id') id: number,
        @Body() updateAddressDto: UpdateAddressDto,
    ) {
        if (!id || !req?.user?.userId) {
            throw new BadRequestException('no data id address in request');
        }

        const updateAddress = this.addresService.updateAddressById(
            updateAddressDto,
            id,
            req?.user?.userId,
        );
        return dataToRespone(AddressDto)(updateAddress);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/address')
    async createAddress(
        @Req() req: any,
        createAddressDto: CreateAddressDto,
    ): Promise<ISuccessRespone<AddressDto>> {
        if (!req?.user?.userId) {
            throw new BadRequestException('no data id address in request');
        }

        const newAddress = await this.addresService.createAddress(
            createAddressDto,
            req?.user?.userId,
        );
        return dataToRespone(AddressDto)(newAddress);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/address/:id')
    async deleteAddressById(
        @Param('id') id: number,
        @Body() updateAddressDto: UpdateAddressDto,
    ) {
        if (!id) {
            throw new BadRequestException('no data id address in request');
        }

        const destroyAddress = this.addresService.destroyAddressById(id);
        return dataToRespone(AddressDto)(destroyAddress);
    }

    @UseGuards(JwtAuthGuard)
    @Get('address/:id')
    async getOneAddressById(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<AddressDto>> {
        if (!id) {
            throw new BadRequestException('no data id address in request');
        }

        const address = this.addresService.findAddressById(id);
        return dataToRespone(AddressDto)(address);
    }
}
