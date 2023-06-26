import { BaseCreatedByEntity } from 'src/common/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';

@Entity()
export class Category extends BaseCreatedByEntity {
    @Column({ unique: true })
    @IsString()
    @MaxLength(20)
    name: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;

    @Column({ default: 1 })
    @IsNumber()
    order: number;

    @OneToMany(() => Category, (category) => category.parentCategory)
    childCategory: Category[];

    @ManyToOne(() => Category, (category) => category.childCategory, {
        onDelete: 'NO ACTION',
        orphanedRowAction: 'disable',
    })
    @JoinColumn()
    parentCategory: Category | number | null;
}
