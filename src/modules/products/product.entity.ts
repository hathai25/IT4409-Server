import { Column, Entity, JoinColumn, JoinTable, ManyToMany,  OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../categorys/category.entity";
import { Media } from "../medias/media.entity";
import { BaseCreatedByEntity } from "src/common/entities";

@Entity()
export class Product extends BaseCreatedByEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    sellOfQuantity: number;

    @Column()
    rate: number;

    @OneToOne(() => Media)
    @JoinColumn()
    thumbnail: Media
    
    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];


}