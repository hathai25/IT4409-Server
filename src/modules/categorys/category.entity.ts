import { BaseEntity } from 'src/common/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Admin } from '../admin/admin.entity';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

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

    @ManyToOne(() => Admin, { onDelete: 'NO ACTION' })
    @JoinColumn()
    createdBy: Admin | number;

    @ManyToOne(() => Admin, { onDelete: 'NO ACTION' })
    @JoinColumn()
    updateBy: Admin | number;

    @ManyToOne(() => Admin)
    deletedBy: Admin | number;
}
