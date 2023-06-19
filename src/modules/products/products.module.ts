import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CategorysModule } from '../categorys/categorys.module';
import { ProductDetailsModule } from '../product-details/product-details.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        CategorysModule,
        ProductDetailsModule,
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService],
})
export class ProductsModule {}
