import { BaseCreatedAnUpdatedEntity } from "src/common/entities";
import {  Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "../admin/admin.entity";

@Entity()
export class Category extends BaseCreatedAnUpdatedEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Category, (category) => category.parentCategory,)
    childCategory: Category[];

    @ManyToOne(() => Category, (category) => category.childCategory, {onDelete: 'CASCADE', orphanedRowAction: 'delete'})
    @JoinColumn()
    parentCategory: Category;

    @ManyToOne(() => Admin, {onDelete: 'NO ACTION'})
    @JoinColumn()
    createdBy: Admin
}