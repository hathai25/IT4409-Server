import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { PaymentType } from 'src/common/enum';

export class CreateTransactionDto {
    @IsOptional()
    @IsEnum(PaymentType)
    type?: PaymentType;

    @IsNumber()
    amount: number;

    @IsString()
    @IsNotEmpty()
    bankCode: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    transactionNo: string;

    @IsString()
    payDate: Date;

    @IsNumber()
    orderId: number;
}
