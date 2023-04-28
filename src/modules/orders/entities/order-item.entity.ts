import { BaseCreatedAnUpdatedEntity } from "src/common/entities";
import { ProductDetail } from "src/modules/product-details/entities/product-detail.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderItem extends BaseCreatedAnUpdatedEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProductDetail)
    productDetailId: ProductDetail;

    @Column()
    number: number;

    @ManyToOne(() => Order, (order) => order.orderItems)
    orderId: Order;
}