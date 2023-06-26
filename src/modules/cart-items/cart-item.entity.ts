import { BaseEntity } from 'src/common/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from 'src/modules/users/entity/users.entity';
import { IsNumber } from 'class-validator';
import { ProductAttributeDefault } from '../product-details/entities/product-attribute-default.entity';

@Entity()
export class CartItem extends BaseEntity {
    @Column({ default: 1 })
    @IsNumber()
    number: number;

    @ManyToOne(() => ProductAttributeDefault, { onDelete: 'SET NULL' })
    itemId: ProductAttributeDefault | number;

    @ManyToOne(() => User)
    @JoinColumn()
    owerId: User | number;
}
