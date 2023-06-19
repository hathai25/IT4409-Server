import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto';

@Injectable()
export class TransationsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transationsRepository: Repository<Transaction>,
    ) {}

    async createTransactions(
        createTransationDto: CreateTransactionDto,
    ): Promise<Transaction> {
        const findTransactions = await this.transationsRepository.findOne({
            where: { transactionNo: createTransationDto.transactionNo },
        });
        if (findTransactions) {
            throw new BadRequestException('transactions no is exist in system');
        }
        const createTransactions =
            this.transationsRepository.create(createTransationDto);
        return await this.transationsRepository.save(createTransactions);
    }

    async getTransactionById(id: number): Promise<Transaction> {
        const findTransactions = await this.transationsRepository.findOne({
            where: { id: id },
        });
        if (findTransactions) {
            throw new NotFoundException('not found expection with id' + id);
        }
        return findTransactions;
    }

    async getTransactionByOrder(orderId: number): Promise<Transaction[]> {
        return await this.transationsRepository.find({
            where: { orderId: { id: orderId } },
        });
    }

    async getAllTransactions(): Promise<Transaction[]> {
        return await this.transationsRepository.find({
            relations: { orderId: true },
        });
    }
}
