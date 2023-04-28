import { BaseEntity } from "src/common/entities";
import { Product } from "src/modules/products/product.entity";
import { User } from "src/modules/users/entity/users.entity";
import {  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReviewMedia } from "./reivew-media";

@Entity()
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    rate: number;

    @ManyToOne(() => Product)
    productId: Product;
    
    @ManyToOne(() => User) 
    owner: User;

    @ManyToOne(() => Review, (review) => review.childReviews)
    parentReview: Review;

    @OneToMany(() => Review, (review) => review.parentReview)
    childReviews: Review[]

    @OneToMany(() => ReviewMedia, (reviewMedia) => reviewMedia.reviewId)
    medias: ReviewMedia[]
}