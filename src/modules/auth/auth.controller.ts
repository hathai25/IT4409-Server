import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto, GetMeDto, LoginDto } from './dtos';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ISuccessRespone } from 'src/common/respone/interface';
import { UserDto } from '../users/dtos/user';
import { dataToRespone } from 'src/common/respone/until';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(
        @Body() createUserDto: CreateUserDto,
    ): Promise<ISuccessRespone<UserDto>> {
        const newUser = await this.authService.register(createUserDto);
        return dataToRespone(UserDto)(newUser);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMeUser(@Req() req: any): Promise<ISuccessRespone<GetMeDto>> {
        return dataToRespone(GetMeDto)(req.user);
    }
}
