import { Injectable } from '@nestjs/common';
import { User } from '../users/entity';
import { LoginDto, CreateUserDto } from './dtos';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto): Promise<any> {
        const user = await this.usersService.validateUser(
            loginDto.email,
            loginDto.password,
        );
        return {
            access_token: await this.jwtService.signAsync({
                username: user.username,
                email: user.email,
                sub: user.id,
                avatar: user.avatar,
            }),
        };
    }

    async register(createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.createUser(createUserDto);
    }
}
