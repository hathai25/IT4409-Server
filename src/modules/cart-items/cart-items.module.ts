import { Module } from '@nestjs/common';
import { CartItemsController } from './cart-items.controller';
import { CartItemsService } from './cart-items.service';

@Module({
  controllers: [CartItemsController],
  providers: [CartItemsService]
})
export class CartItemsModule {}
