import { BaseCreatedAnUpdatedEntity } from 'src/common/entities';
import { ProductDetail } from 'src/modules/product-details/entities/product-detail.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { IsNumber } from 'class-validator';

@Entity()
export class OrderItem extends BaseCreatedAnUpdatedEntity {
    @ManyToOne(() => ProductDetail, { onDelete: 'NO ACTION' })
    productDetailId: ProductDetail;

    @Column({ default: 1 })
    @IsNumber()
    number: number;

    @ManyToOne(() => Order, (order) => order.orderItems, {
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    })
    orderId: Order;
}
