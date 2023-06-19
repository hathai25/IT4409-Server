import { BaseCreatedAnUpdatedEntity } from 'src/common/entities';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { IsNumber } from 'class-validator';
import { ProductAttributeDefault } from 'src/modules/product-details/entities/product-attribute-default.entity';

@Entity()
export class OrderItem extends BaseCreatedAnUpdatedEntity {
    @ManyToOne(() => ProductAttributeDefault, { onDelete: 'NO ACTION' })
    productAttributeDefault: ProductAttributeDefault | number;

    @Column({ default: 1 })
    @IsNumber()
    number: number;

    @ManyToOne(() => Order, (order) => order.orderItems, {
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    })
    orderId: Order;
}
