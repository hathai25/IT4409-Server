import { BaseEntity } from 'src/common/entities';
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { PaymentType, TransactionStatus } from 'src/common/enum';
import { IsEnum } from 'class-validator';

// cập nhật sau
@Entity()
export class Transaction extends BaseEntity {
    @Column({ default: PaymentType.CASH })
    @IsEnum(PaymentType)
    type: PaymentType;

    @Column({ default: TransactionStatus.UNPAID })
    @IsEnum(TransactionStatus)
    status: TransactionStatus;

    @OneToOne(() => Order, {
        onDelete: 'NO ACTION',
        orphanedRowAction: 'disable',
    })
    @JoinColumn()
    orderId: Order;
}
