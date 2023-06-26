import { BaseEntity } from 'src/common/entities';
import { Product } from 'src/modules/products/product.entity';
import { User } from 'src/modules/users/entity/users.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

@Entity()
export class Review extends BaseEntity {
    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    content?: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    rate?: number;

    @Column({ type: 'simple-array', nullable: true })
    medias?: string[];

    @ManyToOne(() => Product, { onDelete: 'CASCADE' })
    productId: Product | number;

    @ManyToOne(() => User, {
        onDelete: 'NO ACTION',
        orphanedRowAction: 'disable',
    })
    owner: User | number;
}
