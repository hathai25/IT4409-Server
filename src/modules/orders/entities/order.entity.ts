import { BaseEntity } from 'src/common/entities';
import { Admin } from 'src/modules/admin/admin.entity';
import { User } from 'src/modules/users/entity/users.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { OrderStatus, PaymentType } from 'src/common/enum';
import { IsBoolean, IsEnum, IsNumber } from 'class-validator';
import { Address } from 'src/modules/users/entity';
import { Type } from 'class-transformer';
import { Transaction } from 'src/modules/transactions/transaction.entity';

@Entity()
export class Order extends BaseEntity {
    @Column({ default: OrderStatus.PREPARED })
    @IsEnum(OrderStatus)
    status: OrderStatus;

    @Column({ default: PaymentType.CASH })
    @IsEnum(PaymentType)
    paymentType: PaymentType;

    @Column()
    @IsNumber()
    totalMoney: number;

    @Column({ default: false })
    isReview: boolean;

    @ManyToOne(() => User, { onDelete: 'NO ACTION' })
    owerId: User | number;

    @ManyToOne(() => Admin, {
        onDelete: 'NO ACTION',
        orphanedRowAction: 'disable',
    })
    updatedBy: Admin | number;

    @ManyToOne(() => Admin, {
        onDelete: 'NO ACTION',
        orphanedRowAction: 'disable',
    })
    deletedBy: Admin | number;

    @Column({ nullable: true })
    @IsBoolean()
    isCancelByUser: boolean;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.orderId)
    orderItems: OrderItem[];

    @ManyToOne(() => Address, { onDelete: 'NO ACTION' })
    @Type(() => Address)
    address: Address | number;

    @OneToMany(() => Transaction, (transation) => transation.orderId)
    transactions: Transaction[] | number;
}
