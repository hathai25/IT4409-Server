import { BaseEntity } from "src/common/entities";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../orders/entities/order.entity";

export enum PaymentType {

}

export enum TransactionStatus {

}

// cập nhật sau
@Entity()
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: PaymentType;

    @Column()
    status: TransactionStatus

    @OneToOne(() => Order)
    @JoinColumn()
    orderId: Order
}