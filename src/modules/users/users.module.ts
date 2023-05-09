import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address, User } from './entity';
import { AddressService } from './address.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Address])],
    controllers: [UsersController],
    providers: [UsersService, AddressService],
    exports: [UsersService, AddressService],
})
export class UsersModule {}
