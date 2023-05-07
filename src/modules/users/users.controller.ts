import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ISuccessListRespone } from 'src/common/respone/interface';
import { UserDto } from './dtos/user.dto';
import { arrDataToRespone } from 'src/common/respone/until';


@Controller('users')
export class UsersController {
    constructor( private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUsers():Promise<ISuccessListRespone<UserDto>> {
        const users = await this.usersService.findAllUsers()
        return arrDataToRespone(UserDto)(users, users.length)
    }
}