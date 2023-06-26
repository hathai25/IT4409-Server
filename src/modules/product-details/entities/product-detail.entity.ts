import { BaseCreatedByEntity } from 'src/common/entities';
import { Product } from 'src/modules/products/product.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ProductAttributeDefault } from './product-attribute-default.entity';
import { AttributeProductValue } from './attribute-product-value.entity';
import { IsArray, IsString } from 'class-validator';

@Entity()
export class ProductDetail extends BaseCreatedByEntity {
    @OneToMany(
        () => ProductAttributeDefault,
        (productAttributeDefault) => productAttributeDefault.productDetailId,
    )
    attributeDefaults: ProductAttributeDefault[] | number[];

    @Column({ type: 'simple-array', nullable: true })
    @IsArray()
    @IsString({ each: true })
    medias: string[];

    @OneToMany(
        () => AttributeProductValue,
        (attributeProductValue) => attributeProductValue.productDetailId,
    )
    attributeValues: AttributeProductValue[] | number[];

    @OneToOne(() => Product, (product) => product.productDetail, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    productId: Product | number;
}
