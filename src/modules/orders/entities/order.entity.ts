import { BaseCreatedAnUpdatedEntity } from "src/common/entities";
import { Admin } from "src/modules/admin/admin.entity";
import { User } from "src/modules/users/entity/users.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";

export enum OrderStatus {

}

@Entity()
export class Order extends BaseCreatedAnUpdatedEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: OrderStatus;

    @Column()
    totalMoney: number;

    @ManyToOne(() => User)
    owerId: User;

    @ManyToOne(() => Admin) 
    updatedBy: Admin

    @ManyToOne(() => Admin)
    deletedBy: Admin;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.orderId) 
    orderItems: OrderItem[]
}
