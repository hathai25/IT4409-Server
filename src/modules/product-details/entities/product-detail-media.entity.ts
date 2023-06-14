import { BaseCreatedAnUpdatedEntity } from 'src/common/entities';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ProductDetail } from './product-detail.entity';
import { Media } from 'src/modules/medias/media.entity';

@Entity()
export class ProductDetailMedia extends BaseCreatedAnUpdatedEntity {
    @ManyToOne(() => ProductDetail, (productDetail) => productDetail.medias, {
        onDelete: 'NO ACTION',
    })
    productDetailId: ProductDetail | number;

    @OneToOne(() => Media, { onDelete: 'CASCADE' })
    @JoinColumn()
    mediaId: Media | number;
}
