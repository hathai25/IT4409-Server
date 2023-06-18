import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto, updateOrderDto } from './dto';
import { OrderStatus } from 'src/common/enum';
import { FilterOrderDto } from './dto/filter-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>
    ) {}

    async createOrder(createOrderDto: CreateOrderDto, owerId: number): Promise<Order> {
        const newOrder = this.orderRepository.create(createOrderDto) 
        
        newOrder.orderItems.forEach(item => {

        })
        newOrder.owerId = owerId
        return await this.orderRepository.save(newOrder)
    }

    async updateOrderByIdFromAdmin(id: number, updateOrderDto: updateOrderDto, adminId: number): Promise<Order> {
        const currOrder = await  this.orderRepository.findOne({ where: { id: id}})
        if (!currOrder) {
            throw new NotFoundException('not found order with id: ' + id)
        }
        currOrder.updatedBy = adminId;
        return await this.orderRepository.save({
            ...currOrder,
            ...updateOrderDto
        })
    }

    async cancelOrderById(id: number, owerId: number): Promise<Order> {
        const currOrder = await this.orderRepository.findOne({ where: { id: id, owerId: { id: owerId}}})
        if (!currOrder) {
            throw new NotFoundException('you cannot have order with id: ' + id) 
        }
        if(currOrder.status !== OrderStatus.PREPARED) {
            throw new ForbiddenException('order not cancel because of status: ' + currOrder.status)
        }
        
        const cancelOrder = await this.orderRepository.softRemove(currOrder)
        if (!cancelOrder) {
            throw new InternalServerErrorException('have error to cancel order')
        }
        cancelOrder.isCancelByUser = true
        return await this.orderRepository.save(cancelOrder)
    }

    async deleteOrderByAdmin(id: number) {
        const currOrder = await this.orderRepository.findOne({ where: { id: id }})
        if (!currOrder) {
            throw new NotFoundException('not found order with id: ' + id) 
        } 
        return await this.orderRepository.softRemove(currOrder)
    }

    async getOrderByStatusFromUser(status: OrderStatus, owerId: number): Promise<Order[]> {
        if (owerId) {
            throw new BadRequestException('not found id user in resquest')
        }
        return await this.orderRepository.find({ where: { status: status, owerId: { id: owerId}}})
    }

    async getOrderByIdForAdmin(id: number): Promise<Order> {
        if(!id) {
            throw new BadRequestException('not found id in resquest')
        }
        const order = await this.orderRepository.findOne({ where: { id: id }})
        if(!order) {
            throw new NotFoundException('not found order with id: ' + id)
        }
        return order
    }
    
    async getOrderByIdForUser(id: number, owerId: number): Promise<Order> {
        if(!id || !owerId) {
            throw new BadRequestException(' not found order id or owerId in resquest')
        }
        const order = await this.orderRepository.findOne({ where: {id: id, owerId: {id: owerId}}})
        if(!order) {
            throw new NotFoundException("you don't have id with id: " + id)
        }
        return order
    }

    async getAllOrderFromAdmin(filterOrderDto: FilterOrderDto): Promise<Order[]> {
        return await this.orderRepository.find({
            where: {...filterOrderDto.options},
            skip: filterOrderDto.skip,
            cache: filterOrderDto.limit
        })
    }
}
