import {
    BadRequestException,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address, User } from './entity';
import { brcyptHelper } from 'src/common/helper/bcrypt.helper';
import { CreateUserDto } from '../auth/dtos';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
    ) {}

    // user
    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOneBy({
            email,
            deleted: false,
        });
        if (
            !user ||
            !(await brcyptHelper.comparePassword(password, user.password))
        ) {
            throw new ForbiddenException('email or password not valid');
        }
        return user;
    }

    //create user
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const users = await this.userRepository.find({
            where: [
                { email: createUserDto.email },
                { username: createUserDto.username },
            ],
        });
        if (users.length !== 0) {
            throw new BadRequestException('email or username is exist');
        }

        const newUser = new User();
        newUser.email = createUserDto.email;
        newUser.password = createUserDto.password;
        newUser.username = createUserDto.username;
        const user = await this.userRepository.save(newUser);

        return user;
    }

    // find All
    async findAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }
}
