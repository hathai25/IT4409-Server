import { BaseCreatedAnUpdatedEntity } from "src/common/entities";
import { ProductDetail } from "src/modules/product-details/entities/product-detail.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/modules/users/entity/users.entity";

@Entity()
export class CartItem extends BaseCreatedAnUpdatedEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: number;
    
    @ManyToOne(() => ProductDetail)
    itemId: ProductDetail;

    @OneToOne(() => User)
    @JoinColumn()
    owerId: User

}