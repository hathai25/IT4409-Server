import { Column, Entity, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { Category } from '../categorys/category.entity';
import { BaseCreatedByEntity } from 'src/common/entities';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductDetail } from '../product-details/entities/product-detail.entity';

@Entity()
export class Product extends BaseCreatedByEntity {
    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    @IsNumber()
    price: number;

    @Column({ default: 0 })
    @IsNumber()
    sellOfQuantity: number;

    @Column({ default: 5 })
    @IsNumber()
    rate: number;

    @Column()
    @IsNotEmpty()
    thumbnail: string;

    @OneToOne(() => ProductDetail, (productDetail) => productDetail.productId)
    productDetail: ProductDetail;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];
}
