import { Module } from '@nestjs/common';
import { ProductDetailsController } from './product-details.controller';
import { ProductDetailsService } from './product-details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetail } from './entities/product-detail.entity';
import { ProductDetailMedia } from './entities/product-detail-media.entity';
import { AttributeProduct } from './entities/attribute-product.entity';
import { AttributeProductValue } from './entities/attribute-product-value.entity';
import { AttributeDefaultsService } from './attribute-default.service';
import { AttributeProductsService } from './attribute-products.service';
import { AttributeValuesService } from './attribute-values.service';
import { MediaProductDetailsService } from './media-product-detail.service';
import { ProductAttributeDefault } from './entities/product-attribute-default.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductDetail,
            ProductDetailMedia,
            AttributeProduct,
            AttributeProductValue,
            ProductAttributeDefault,
        ]),
    ],
    controllers: [ProductDetailsController],
    providers: [
        ProductDetailsService,
        AttributeDefaultsService,
        AttributeProductsService,
        AttributeValuesService,
        MediaProductDetailsService,
    ],
    exports: [ProductDetailsService],
})
export class ProductDetailsModule {}
