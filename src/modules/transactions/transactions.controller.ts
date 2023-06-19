import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TransationsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTransactionDto, TransactionDto } from './dto';
import { arrDataToRespone, dataToRespone } from 'src/common/respone/until';
import {
    ISuccessListRespone,
    ISuccessRespone,
} from 'src/common/respone/interface';
import { JwtAdminGuard, RolesGuard } from '../admin/guards';
import { Role } from 'src/common/enum';
import { Roles } from '../admin/decorator/role.decorator';

@Controller('transations')
export class TransationsController {
    constructor(private readonly transationsService: TransationsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createTransation(
        @Body() createTransationDto: CreateTransactionDto,
    ): Promise<ISuccessRespone<TransactionDto>> {
        const newTransation = await this.transationsService.createTransactions(
            createTransationDto,
        );
        return dataToRespone(TransactionDto)(newTransation);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    @Get()
    async getAllTransations(): Promise<ISuccessListRespone<TransactionDto>> {
        const transactions = await this.transationsService.getAllTransactions();
        return arrDataToRespone(TransactionDto)(
            transactions,
            transactions.length,
        );
    }
}
