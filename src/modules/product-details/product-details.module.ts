import { Module } from '@nestjs/common';
import { ProductDetailsController } from './product-details.controller';
import { ProductDetailsService } from './product-details.service';

@Module({
  controllers: [ProductDetailsController],
  providers: [ProductDetailsService]
})
export class ProductDetailsModule {}
