import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseCreatedByEntity } from 'src/common/entities';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductDetail } from './product-detail.entity';

@Entity()
export class ProductAttributeDefault extends BaseCreatedByEntity {
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

    @Column({ default: 0 })
    @IsNumber()
    orderNumber: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    mediaId: string;

    @ManyToOne(() => ProductDetail, {
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    })
    productDetailId: ProductDetail | number;
}
