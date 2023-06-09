import { BaseCreatedByEntity } from 'src/common/entities';
import { Product } from 'src/modules/products/product.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { ProductDetailMedia } from './product-detail-media.entity';
import {  IsInt, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class ProductDetail extends BaseCreatedByEntity {
    @Column()
    @IsString()
    @IsNotEmpty()
    color: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    size: string;

    @Column({ default: 0 })
    @IsInt()
    inventoryNumber: number;

    @OneToMany(
        () => ProductDetailMedia,
        (producDetailMedia) => producDetailMedia.productDetailId,
    )
    medias: ProductDetailMedia[];

    @ManyToOne(() => Product, { onDelete: 'CASCADE' })
    productId: Product;
}
