import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entity';
import { Repository } from 'typeorm';
import { Admin } from '../admin/admin.entity';
import { brcyptHelper } from 'src/common/helper/bcrypt.helper';
import { LoginDto, CreateUserDto } from './dtos';
import { ISuccessRespone } from 'src/common/Interface-respone';
import { dataToRespone } from 'src/common/respone';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>
    ){}

    async login(loginDto: LoginDto): Promise<ISuccessRespone<User>> {
        const user = await  this.userRepository.findOneBy({email: loginDto.email})
        if(!user || !await brcyptHelper.comparePassword(loginDto.password, user.password)) {
            throw new ForbiddenException('email or password not valid')
        }
        return dataToRespone(user)
    }

    async register(createUserDto: CreateUserDto): Promise<ISuccessRespone<User>> {
        const users = await this.userRepository.find({where: [{email: createUserDto.email}, {username: createUserDto.username}]})
        if (users.length !== 0) {
            throw new  BadRequestException('email or username is exist')
        }

        const newUser = new User();
        newUser.email = createUserDto.email;
        newUser.password = createUserDto.password;
        newUser.username = createUserDto.username;
        const user =  await this.userRepository.save(newUser)

        return dataToRespone(user)
    }
}
