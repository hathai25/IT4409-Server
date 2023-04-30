import { BaseEntity } from 'src/common/entities';
import { ProductDetail } from 'src/modules/product-details/entities/product-detail.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from 'src/modules/users/entity/users.entity';
import { IsNumber } from 'class-validator';

@Entity()
export class CartItem extends BaseEntity {
    @Column({ default: 1 })
    @IsNumber()
    number: number;

    @ManyToOne(() => ProductDetail, { onDelete: 'SET NULL' })
    itemId: ProductDetail;

    @OneToOne(() => User, { orphanedRowAction: 'delete' })
    @JoinColumn()
    owerId: User;
}
