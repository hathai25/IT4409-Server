import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrderDto, OrderDto } from './dto';
import { ISuccessRespone } from 'src/common/respone/interface';
import { dataToRespone } from 'src/common/respone/until';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req: any): Promise<ISuccessRespone<OrderDto>> {
        const order = await this.ordersService.createOrder(createOrderDto, req?.user?.userId)
        return dataToRespone(OrderDto)(order)
    }
    
}
