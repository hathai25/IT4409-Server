import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { PaymentType } from 'src/common/enum';

export class CreateVnpayDto {
    @IsNumber()
    amount: number;

    @IsNumber()
    orderId: number;
}
