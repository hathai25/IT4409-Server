import { BaseEntity } from 'src/common/entities';
import { Admin } from 'src/modules/admin/admin.entity';
import { User } from 'src/modules/users/entity/users.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from 'src/common/enum';
import { IsBoolean, IsEnum, IsNumber } from 'class-validator';

@Entity()
export class Order extends BaseEntity {
    @Column({ default: OrderStatus.SUCCESS })
    @IsEnum(OrderStatus)
    status: OrderStatus;

    @Column()
    @IsNumber()
    totalMoney: number;

    @ManyToOne(() => User, { onDelete: 'NO ACTION' })
    owerId: User;

    @ManyToOne(() => Admin, {
        onDelete: 'NO ACTION',
        orphanedRowAction: 'disable',
    })
    updatedBy: Admin;

    @ManyToOne(() => Admin, {
        onDelete: 'NO ACTION',
        orphanedRowAction: 'disable',
    })
    deletedBy: Admin;

    @Column({ default: false })
    @IsBoolean()
    isDeletedByUser: boolean;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.orderId)
    orderItems: OrderItem[];
}
