import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
    Query,
    Get,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrderDto, OrderDto, UpdateOrderDto } from './dto';
import {
    ISuccessListRespone,
    ISuccessRespone,
} from 'src/common/respone/interface';
import { arrDataToRespone, dataToRespone } from 'src/common/respone/until';
import { JwtAdminGuard, RolesGuard } from '../admin/guards';
import { OrderStatus, Role } from 'src/common/enum';
import { Roles } from '../admin/decorator/role.decorator';
import { FilterOrderDto } from './dto/filter-order.dto';
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createOrder(
        @Body() createOrderDto: CreateOrderDto,
        @Req() req: any,
    ): Promise<ISuccessRespone<OrderDto>> {
        const order = await this.ordersService.createOrder(
            createOrderDto,
            req?.user?.userId,
        );
        return dataToRespone(OrderDto)(order);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageOrder)
    @Patch('/admin/cancel/:id')
    async cencelOrderByAdmin(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<OrderDto>> {
        const cancelOrder = await this.ordersService.cancelOrderByAdmin(id);
        return dataToRespone(OrderDto)(cancelOrder);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('user/cancel/:id')
    async cancelOrderByUser(
        @Param('id') id: number,
        @Req() req: any,
    ): Promise<ISuccessRespone<OrderDto>> {
        const cancelOrder = await this.ordersService.cancelOrderById(
            id,
            req?.user?.userId,
        );
        return dataToRespone(OrderDto)(cancelOrder);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('received/:id')
    async updateOrderWithReceivedStatus(
        @Param('id') id: number,
        @Req() req: any,
    ): Promise<ISuccessRespone<OrderDto>> {
        const recievedOrder =
            await this.ordersService.updateOrderWithStatusReceived(
                id,
                req?.user?.userId,
            );
        return dataToRespone(OrderDto)(recievedOrder);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageOrder)
    @Patch(':id')
    async updateOrderByAdmin(
        @Body() updateOrderDto: UpdateOrderDto,
        @Param('id') id: number,
        @Req() req: any,
    ): Promise<ISuccessRespone<OrderDto>> {
        switch (updateOrderDto.status) {
            case OrderStatus.DELIVERED:
                const updateOrder =
                    await this.ordersService.updateOrderByIdFromAdmin(
                        id,
                        updateOrderDto,
                        req?.user?.adminId,
                    );
                return dataToRespone(OrderDto)(updateOrder);
            case OrderStatus.DELIVERING:
                const updateDeliveringOrder =
                    await this.ordersService.updateOrderWithDeliveringStatus(
                        id,
                        req?.user?.adminId,
                    );
                return dataToRespone(OrderDto)(updateDeliveringOrder);
            default:
                throw new BadRequestException('you do not update order status');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletedOrderWhenPaymentFaild(
        @Param('id') id: number,
        @Req() req: any,
    ): Promise<ISuccessRespone<OrderDto>> {
        const deleteOrder =
            await this.ordersService.deleteOrderWhenPaymentFailed(
                id,
                req?.user?.userId,
            );
        return dataToRespone(OrderDto)(deleteOrder);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getOrderByStatusFromUser(
        @Query('status') status: OrderStatus,
        @Req() req: any,
    ): Promise<ISuccessListRespone<OrderDto>> {
        const orders = await this.ordersService.getOrderByStatusFromUser(
            status,
            req?.user?.userId,
        );
        return arrDataToRespone(OrderDto)(orders, orders.length);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageOrder)
    @Get('management')
    async getAllOrderFromAdmin(
        @Query() filterOrderDto: FilterOrderDto,
    ): Promise<ISuccessListRespone<OrderDto>> {
        const orders = await this.ordersService.getAllOrderFromAdmin(
            filterOrderDto,
        );
        return arrDataToRespone(OrderDto)(orders, orders.length);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageOrder)
    @Get('management/:id')
    async getOrderDetailsFromAdmin(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<OrderDto>> {
        const orderDetail = await this.ordersService.getOrderDetailsFromAdmin(
            id,
        );
        return dataToRespone(OrderDto)(orderDetail);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOrderDetailByIdForUser(
        @Param('id') id: number,
        @Req() req: any,
    ): Promise<ISuccessRespone<OrderDto>> {
        const orderDetail = await this.ordersService.getOrderDetailByIdForUser(
            id,
            req?.user?.userId,
        );
        return dataToRespone(OrderDto)(orderDetail);
    }
}
