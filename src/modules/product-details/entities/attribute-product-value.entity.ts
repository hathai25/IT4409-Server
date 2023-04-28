import { BaseCreatedByEntity } from "src/common/entities";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductDetail } from "./product-detail.entity";
import { AttributeProduct } from "./attribute-product.entity";

@Entity()
export class AttributeProductValue extends BaseCreatedByEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @ManyToOne(() => ProductDetail)
    productDetailId: ProductDetail;

    @ManyToOne(() => AttributeProduct)
    attributeId: AttributeProduct;
}