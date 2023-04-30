import { BaseEntity } from 'src/common/entities';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Admin } from '../admin/admin.entity';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Product } from '../products/product.entity';

@Entity()
export class Category extends BaseEntity {
    @Column({ unique: true })
    @IsString()
    @MaxLength(20)
    name: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    description: string;

    @OneToMany(() => Category, (category) => category.parentCategory)
    childCategory: Category[];

    @ManyToOne(() => Category, (category) => category.childCategory, {
        onDelete: 'NO ACTION',
        orphanedRowAction: 'disable',
    })
    @JoinColumn()
    parentCategory: Category;

    @ManyToOne(() => Admin, { onDelete: 'NO ACTION' })
    @JoinColumn()
    createdBy: Admin;

    @ManyToOne(() => Admin)
    deletedBy: Admin;
}
