import { BaseCreatedAnUpdatedEntity } from "src/common/entities";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "./review.entity";
import { Media } from "src/modules/medias/media.entity";

@Entity()
export class ReviewMedia extends BaseCreatedAnUpdatedEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Review, (review) => review.medias)
    reviewId: Review;

    @OneToOne(() => Media)
    @JoinColumn()
    mediasId: Media
}