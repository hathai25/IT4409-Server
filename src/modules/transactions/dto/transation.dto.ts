import { Expose, Type } from 'class-transformer';
import { PaymentType } from 'src/common/enum';
import { OrderDto } from 'src/modules/orders/dto';

export class TransactionDto {
    @Expose()
    id: number;

    @Expose()
    type: PaymentType;

    @Expose()
    amount: number;

    @Expose()
    bankCode: string;

    @Expose()
    description: string;

    @Expose()
    transactionNo: string;

    @Expose()
    payDate: Date;

    @Expose()
    createAt: Date;

    @Expose()
    @Type(() => OrderDto)
    orderId: OrderDto | number;
}
