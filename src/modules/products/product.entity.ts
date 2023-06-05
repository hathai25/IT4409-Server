import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToOne,
} from 'typeorm';
import { Category } from '../categorys/category.entity';
import { Media } from '../medias/media.entity';
import { BaseCreatedByEntity } from 'src/common/entities';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity()
export class Product extends BaseCreatedByEntity {
    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    @IsNumber()
    price: number;

    @Column({ default: 0 })
    @IsNumber()
    sellOfQuantity: number;

    @Column({ default: 5 })
    @IsNumber()
    rate: number;

    @OneToOne(() => Media, {
        onDelete: 'SET NULL',
        orphanedRowAction: 'nullify',
    })
    @JoinColumn()
    thumbnail: Media | number;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];
}
