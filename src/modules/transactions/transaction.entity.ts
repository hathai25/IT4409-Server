import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { PaymentType } from 'src/common/enum';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: PaymentType.VNPAY })
    @IsEnum(PaymentType)
    type?: PaymentType;

    @Column()
    @IsNumber()
    amount: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    bankCode: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    description: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    transactionNo: string;

    @Column()
    payDate: Date;

    @CreateDateColumn()
    createAt: Date;

    @ManyToOne(() => Order, {
        onDelete: 'NO ACTION',
        orphanedRowAction: 'disable',
    })
    @JoinColumn()
    orderId: Order | number;
}
