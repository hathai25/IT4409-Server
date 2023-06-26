import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity';
import { brcyptHelper } from 'src/common/helper/bcrypt.helper';
import { CreateUserDto } from '../auth/dtos';
import { FilterDto, UpdateUserDto } from './dtos/user';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
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
    async findAllUsers(filterDto: FilterDto): Promise<User[]> {
        return await this.userRepository.find({
            where: {
                ...filterDto.options,
            },
            skip: filterDto.skip,
            take: filterDto.limit,
        });
    }

    //find soft user
    async findAllSoftDeleteUsers(filterDto: FilterDto): Promise<User[]> {
        return await this.userRepository.find({
            where: {
                ...filterDto.options,
                deleted: true
            },
            withDeleted: true,
            skip: filterDto.skip,
            take: filterDto.limit,
        });
    }

    // find activiti user
    async findUserById(id: number): Promise<User> {
        const curUser = await this.userRepository.findOneBy({
            id: id,
            deleted: false,
        });
        if (!curUser) {
            throw new BadRequestException(`user is not found in system`);
        }
        return curUser;
    }

    //find soft delete user
    async findSoftDeleteUserById(id: number): Promise<User> {
        const softDeleteUser = await this.userRepository.findOne({
            where: { id: id, deleted: true },
            withDeleted: true,
        });
        if (!softDeleteUser) {
            throw new NotFoundException('user not found in trash');
        }

        return softDeleteUser;
    }

    //update user
    async updateUserById(
        id: number,
        updateUserDto: UpdateUserDto,
    ): Promise<User> {
        if (updateUserDto.username) {
            const userWithUsername = await this.userRepository.findOne({
                withDeleted: true,
                where: { username: updateUserDto.username },
            });
            if (userWithUsername) {
                throw new BadRequestException('username is exist in system');
            }
        }

        const curUser = await this.findUserById(id);

        const updateUser = await this.userRepository.save({
            ...curUser,
            ...updateUserDto,
        });

        return updateUser;
    }

    async softDeletUserById(id: number): Promise<User> {
        const currUser = await this.findUserById(id);
        const softDeleteUser = await this.userRepository.softRemove(currUser);
        return await this.userRepository.save(softDeleteUser);
    }

    async restoreUserById(id: number): Promise<User> {
        const softDeleteUser = await this.userRepository.findOne({
            where: { id: id, deleted: true },
            withDeleted: true,
        });
        if (!softDeleteUser) {
            throw new NotFoundException(`user is not found in trash`);
        }
        const restoreUser = await this.userRepository.recover(softDeleteUser);
        return await this.userRepository.save(restoreUser);
    }

    async destroyUserById(id: number): Promise<User> {
        const softDeleteUser = await this.findSoftDeleteUserById(id);
        return await this.userRepository.remove(softDeleteUser);
    }

    async getDetailsUserById(id: number): Promise<User> {
        const userDetail = await this.userRepository.findOne({
            where: { id: id },
            withDeleted: true,
            relations: ['address'],
        });
        return userDetail;
    }
}
