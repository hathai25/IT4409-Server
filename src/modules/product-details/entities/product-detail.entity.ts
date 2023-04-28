import { BaseCreatedByEntity } from "src/common/entities";
import { Product } from "src/modules/products/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductDetailMedia } from "./product-detail-media.entity";

@Entity()
export class ProductDetail extends BaseCreatedByEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    color: string;

    @Column()
    size: string;

    @Column()
    inventoryNumber: number;

    @OneToMany(() => ProductDetailMedia, (producDetailMedia) => producDetailMedia.productDetailId)
    medias: ProductDetailMedia[];

    @ManyToOne(() => Product)
    productId: Product
}
