import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemDto, CreateCartItemDto, UpdateCartItemDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
    ISuccessListRespone,
    ISuccessRespone,
} from 'src/common/respone/interface';
import { arrDataToRespone, dataToRespone } from 'src/common/respone/until';

@Controller('cart-items')
export class CartItemsController {
    constructor(private readonly cartItemsService: CartItemsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createCartItems(
        @Body() createCartItemDto: CreateCartItemDto,
        @Req() req: any,
    ): Promise<ISuccessRespone<CartItemDto>> {
        const newCartItems = await this.cartItemsService.createCartItem(
            createCartItemDto,
            req?.user?.userId,
        );
        return dataToRespone(CartItemDto)(newCartItems);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateCartItem(
        @Body() updateCartItemDto: UpdateCartItemDto,
        @Req() req: any,
        @Param('id') id: number,
    ): Promise<ISuccessRespone<CartItemDto>> {
        const updateCartItem = await this.cartItemsService.updateCartItemById(
            id,
            updateCartItemDto,
            req?.user?.userId,
        );
        return dataToRespone(CartItemDto)(updateCartItem);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async destroyCartItemById(
        @Param('id') id: number,
        @Req() req: any,
    ): Promise<ISuccessRespone<CartItemDto>> {
        const destroyCartItem = await this.cartItemsService.destroyCartItemById(
            id,
            req?.user?.userId,
        );
        return dataToRespone(CartItemDto)(destroyCartItem);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getCartItemById(
        @Param('id') id: number,
        @Req() req: any,
    ): Promise<ISuccessRespone<CartItemDto>> {
        const cartItem = await this.cartItemsService.getCartItemById(
            id,
            req?.user?.userId,
        );
        return dataToRespone(CartItemDto)(cartItem);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllCartItems(
        @Req() req: any,
    ): Promise<ISuccessListRespone<CartItemDto>> {
        const cartItems = await this.cartItemsService.getAllCartItemOfOwer(
            req?.user?.userId,
        );
        return arrDataToRespone(CartItemDto)(cartItems, cartItems.length);
    }
}
