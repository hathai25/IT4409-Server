import { BaseEntity } from 'src/common/entities';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductDetail } from './product-detail.entity';
import { AttributeProduct } from './attribute-product.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class AttributeProductValue extends BaseEntity {
    @Column()
    @IsString()
    @IsNotEmpty()
    value: string;

    @ManyToOne(() => ProductDetail, {
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    })
    productDetailId: ProductDetail;

    @ManyToOne(() => AttributeProduct, {
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    })
    attributeId: AttributeProduct;
}
