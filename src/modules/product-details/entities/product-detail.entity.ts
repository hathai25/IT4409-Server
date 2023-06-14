import { BaseCreatedByEntity } from 'src/common/entities';
import { Product } from 'src/modules/products/product.entity';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ProductDetailMedia } from './product-detail-media.entity';
import { ProductAttributeDefault } from './product-attribute-default.entity';
import { AttributeProductValue } from './attribute-product-value.entity';

@Entity()
export class ProductDetail extends BaseCreatedByEntity {
    @OneToMany(
        () => ProductAttributeDefault,
        (productAttributeDefault) => productAttributeDefault.productDetailId,
    )
    attributeDefaults: ProductAttributeDefault[] | number[];

    @OneToMany(
        () => ProductDetailMedia,
        (producDetailMedia) => producDetailMedia.productDetailId,
    )
    medias: ProductDetailMedia[] | number[];

    @OneToMany(
        () => AttributeProductValue,
        (attributeProductValue) => attributeProductValue.productDetailId,
    )
    attributeValues: AttributeProductValue[] | number[];

    @OneToOne(() => Product, { onDelete: 'CASCADE' })
    @JoinColumn()
    productId: Product | number;
}
