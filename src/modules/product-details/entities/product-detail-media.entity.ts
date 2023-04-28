import { BaseCreatedAnUpdatedEntity } from "src/common/entities";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductDetail } from "./product-detail.entity";
import { Media } from "src/modules/medias/media.entity";

@Entity() 
export class ProductDetailMedia extends BaseCreatedAnUpdatedEntity {
    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(() => ProductDetail, (productDetail) => productDetail.medias)
    productDetailId: ProductDetail

    @OneToOne(() => Media)
    @JoinColumn()
    mediaId: Media 
}