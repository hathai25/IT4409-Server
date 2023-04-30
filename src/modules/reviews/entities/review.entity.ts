import { BaseEntity } from 'src/common/entities';
import { Product } from 'src/modules/products/product.entity';
import { User } from 'src/modules/users/entity/users.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ReviewMedia } from './reivew-media';
import { IsInt, IsString, Max, Min } from 'class-validator';

@Entity()
export class Review extends BaseEntity {
    @Column()
    @IsString()
    content: string;

    @Column()
    @IsInt()
    @Min(1)
    @Max(5)
    rate: number;

    @ManyToOne(() => Product, { onDelete: 'CASCADE' })
    productId: Product;

    @ManyToOne(() => User, {
        onDelete: 'NO ACTION',
        orphanedRowAction: 'disable',
    })
    owner: User;

    @ManyToOne(() => Review, (review) => review.childReviews, {
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    })
    parentReview: Review;

    @OneToMany(() => Review, (review) => review.parentReview)
    childReviews: Review[];

    @OneToMany(() => ReviewMedia, (reviewMedia) => reviewMedia.reviewId)
    medias: ReviewMedia[];
}
