import { Module } from '@nestjs/common';
import { ProductDetailsController } from './product-details.controller';
import { ProductDetailsService } from './product-details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetail } from './entities/product-detail.entity';
import { ProductDetailMedia } from './entities/product-detail-media.entity';
import { AttributeProduct } from './entities/attribute-product.entity';
import { AttributeProductValue } from './entities/attribute-product-value.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductDetail, ProductDetailMedia, AttributeProduct, AttributeProductValue])],
    controllers: [ProductDetailsController],
    providers: [ProductDetailsService],
    exports: [ProductDetailsService]
})
export class ProductDetailsModule {}
