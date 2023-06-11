import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemDto, CreateCartItemDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ISuccessRespone } from 'src/common/respone/interface';
import { dataToRespone } from 'src/common/respone/until';

@Controller('cart-items')
export class CartItemsController {
    constructor(private readonly cartItemsService: CartItemsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createCartItems(@Body() createCartItemDto: CreateCartItemDto, @Req() req: any): Promise<ISuccessRespone<CartItemDto>> {
        const newCartItems = await this.cartItemsService.createCartItem(createCartItemDto, req?.user?.userId)
        console.log(newCartItems)
        return dataToRespone(CartItemDto)(newCartItems)
    }
}
