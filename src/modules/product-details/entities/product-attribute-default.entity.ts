import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { BaseCreatedByEntity } from 'src/common/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ProductDetail } from './product-detail.entity';
import { Media } from 'src/modules/medias/media.entity';

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

    @OneToOne(() => Media, { onDelete: 'CASCADE' })
    @JoinColumn()
    mediaId: Media | number;

    @ManyToOne(() => ProductDetail, {
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    })
    productDetailId: ProductDetail | number;
}
