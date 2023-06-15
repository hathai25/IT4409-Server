import { BaseCreatedAnUpdatedEntity } from 'src/common/entities';
import {
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from './review.entity';
import { Media } from 'src/modules/medias/media.entity';

@Entity()
export class ReviewMedia extends BaseCreatedAnUpdatedEntity {
    @ManyToOne(() => Review, (review) => review.medias, {
        onDelete: 'NO ACTION',
        orphanedRowAction: 'disable',
    })
    reviewId: Review;

    // @OneToOne(() => Media, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
    // @JoinColumn()
    // mediasId: Media;
}
