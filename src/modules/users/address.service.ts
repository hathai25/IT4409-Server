import {
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/address';
import { UsersService } from './users.service';
import { UpdateAddressDto } from './dtos/address/update-address.dto';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
        private readonly usersService: UsersService,
    ) {}

    async createAddress(
        createAddresDto: CreateAddressDto,
        userId: number,
    ): Promise<Address> {
        try {
            const newAddress =  this.addressRepository.create({
                ...createAddresDto,
                userId: userId,
            });

            return await this.addressRepository.save(newAddress);
        } catch (error) {
            throw new HttpException(`don't create address`, 500, {
                cause: error,
            });
        }
    }

    async findAddressById(id: number): Promise<Address> {
        const currAddress = await this.addressRepository.findOneBy({ id: id });
        if (!currAddress) {
            throw new NotFoundException('address is not found');
        }

        return currAddress;
    }

    async findAllAddressByUserId(userId: number): Promise<Address[]> {
        const currAddress = await this.addressRepository.find({
            where: { userId: userId },
        });
        if (!currAddress.length) {
            throw new InternalServerErrorException(
                'have error to find all addresses',
            );
        }

        return currAddress;
    }

    async updateAddressById(
        updateAddressDto: UpdateAddressDto,
        addressId: number,
    ): Promise<Address> {
        const currAddress = await this.findAddressById(addressId);
        const updateAddress = await this.addressRepository.save({
            ...currAddress,
            ...updateAddressDto,
        });

        return updateAddress;
    }

    async destroyAddressById(id: number): Promise<Address> {
        const currAddress = await this.findAddressById(id);
        const destroyAdress = await this.addressRepository.remove(currAddress);
        if (!destroyAdress) {
            throw new InternalServerErrorException(
                'have bug to destroy address',
            );
        }
        return destroyAdress;
    }
}
