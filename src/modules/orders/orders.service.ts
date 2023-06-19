import {
    BadRequestException,
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { EntityManager, QueryRunner, Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { OrderStatus, PaymentType } from 'src/common/enum';
import { FilterOrderDto } from './dto/filter-order.dto';
import { AttributeDefaultsService } from '../product-details/attribute-default.service';
import { ProductAttributeDefault } from '../product-details/entities/product-attribute-default.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectEntityManager() private readonly entityManager: EntityManager,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly attributeDefaultService: AttributeDefaultsService,
    ) {}

    async createOrder(
        createOrderDto: CreateOrderDto,
        owerId: number,
    ): Promise<Order> {
        const result = await this.entityManager.transaction(
            async (entityManager) => {
                const queryRunner: QueryRunner = entityManager.queryRunner;
                await queryRunner.startTransaction();
                try {
                    const createNewOrder = entityManager.create(
                        Order,
                        createOrderDto,
                    );
                    createNewOrder.owerId = owerId;
                    const newOrder = await entityManager.save(createNewOrder);
                    for (const item of createOrderDto.orderItems) {
                        const attributesDefault =
                            await this.attributeDefaultService.getAttributeDefaultById(
                                item.productAttributeDefault,
                            );
                        if (
                            attributesDefault.orderNumber + item.number >
                            attributesDefault.inventoryNumber
                        ) {
                            throw new BadRequestException(
                                'product is unavailable',
                            );
                        }
                        const createNewOrderItem = entityManager.create(
                            OrderItem,
                            { ...item, orderId: newOrder },
                        );
                        await entityManager.save(createNewOrderItem);
                        attributesDefault.orderNumber += item.number;
                        await entityManager.update(
                            ProductAttributeDefault,
                            attributesDefault.id,
                            attributesDefault,
                        );
                    }
                    await queryRunner.commitTransaction();
                    return newOrder;
                } catch (error) {
                    await queryRunner.rollbackTransaction();
                    throw new HttpException(
                        error?.response.message ?? error.sqlMessage,
                        error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
                        { cause: error },
                    );
                }
            },
        );
        return result;
    }

    async updateOrderByIdFromAdmin(
        id: number,
        updateOrderDto: UpdateOrderDto,
        adminId: number,
    ): Promise<Order> {
        if (
            updateOrderDto.status === OrderStatus.DELIVERING ||
            updateOrderDto.status === OrderStatus.RECEIVED
        ) {
            throw new ForbiddenException(
                'you cannot update order with order status ' +
                    updateOrderDto.status,
            );
        }
        const currOrder = await this.orderRepository.findOne({
            where: { id: id },
        });
        if (!currOrder) {
            throw new NotFoundException('not found order with id: ' + id);
        }
        currOrder.updatedBy = adminId;
        currOrder.status = updateOrderDto.status;
        return await this.orderRepository.save(currOrder);
    }

    async cancelOrderById(id: number, owerId: number): Promise<Order> {
        const currOrder = await this.orderRepository.findOne({
            where: { id: id, owerId: { id: owerId } },
        });

        if (!currOrder) {
            throw new NotFoundException('you cannot have order with id: ' + id);
        }
        if (currOrder.status !== OrderStatus.PREPARED) {
            throw new ForbiddenException(
                'order not cancel because of status is: ' + currOrder.status,
            );
        }
        currOrder.status = OrderStatus.FAILURE;
        currOrder.isCancelByUser = true;
        const result = await this.entityManager.transaction(
            async (entityManager) => {
                const queryRunner: QueryRunner = entityManager.queryRunner;
                await queryRunner.startTransaction();
                try {
                    const cancelOrder = await entityManager.save(
                        Order,
                        currOrder,
                    );
                    const findOrrderItems = await entityManager.find(
                        OrderItem,
                        {
                            where: { orderId: { id: currOrder.id } },
                            relations: { productAttributeDefault: true },
                            select: {
                                productAttributeDefault: {
                                    id: true,
                                    orderNumber: true,
                                },
                                number: true,
                            },
                        },
                    );
                    // hoàn lại số đơn hàng
                    for (let item of findOrrderItems) {
                        const attributesDefault =
                            await this.attributeDefaultService.getAttributeDefaultById(
                                (
                                    item.productAttributeDefault as ProductAttributeDefault
                                ).id,
                            );
                        attributesDefault.orderNumber =
                            attributesDefault.orderNumber - item.number;
                        await entityManager.save(
                            ProductAttributeDefault,
                            attributesDefault,
                        );
                    }
                    // hoàn lại tiền thanh toán.
                    if (currOrder.paymentType === PaymentType.CASH) {
                        await queryRunner.commitTransaction();
                        return cancelOrder;
                    }
                    // gọi api hoàn tiền thanh toán tại đây
                    await queryRunner.commitTransaction();
                    return cancelOrder;
                } catch (error) {
                    await queryRunner.rollbackTransaction();
                    throw new HttpException(
                        'update  failed',
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        { cause: error },
                    );
                }
            },
        );
        return result;
    }

    async cancelOrderByAdmin(id: number): Promise<Order> {
        const currOrder = await this.orderRepository.findOne({
            where: { id: id },
        });
        if (!currOrder) {
            throw new NotFoundException('not found order with id: ' + id);
        }
        if (currOrder.status !== OrderStatus.PREPARED) {
            throw new ForbiddenException(
                'order not cancel because of status is: ' + currOrder.status,
            );
        }
        currOrder.status = OrderStatus.FAILURE;
        const result = await this.entityManager.transaction(
            async (entityManager) => {
                const queryRunner: QueryRunner = entityManager.queryRunner;
                await queryRunner.startTransaction();
                try {
                    const cancelOrder = await entityManager.save(
                        Order,
                        currOrder,
                    );
                    const findOrrderItems = await entityManager.find(
                        OrderItem,
                        {
                            where: { orderId: { id: currOrder.id } },
                            relations: { productAttributeDefault: true },
                            select: {
                                productAttributeDefault: {
                                    id: true,
                                    orderNumber: true,
                                },
                                number: true,
                            },
                        },
                    );
                    // hoàn lại số đơn hàng
                    for (let item of findOrrderItems) {
                        const attributesDefault =
                            await this.attributeDefaultService.getAttributeDefaultById(
                                (
                                    item.productAttributeDefault as ProductAttributeDefault
                                ).id,
                            );
                        attributesDefault.orderNumber =
                            attributesDefault.orderNumber - item.number;
                        await entityManager.save(
                            ProductAttributeDefault,
                            attributesDefault,
                        );
                    }
                    // hoàn lại tiền thanh toán.
                    if (currOrder.paymentType === PaymentType.CASH) {
                        await queryRunner.commitTransaction();
                        return cancelOrder;
                    }
                    // gọi api hoàn tiền thanh toán tại đây
                    await queryRunner.commitTransaction();
                    return cancelOrder;
                } catch (error) {
                    await queryRunner.rollbackTransaction();
                    throw new HttpException(
                        'update  failed',
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        { cause: error },
                    );
                }
            },
        );
        return result;
    }

    async updateOrderWithDeliveringStatus(
        id: number,
        adminId: number,
    ): Promise<Order> {
        const currOrder = await this.orderRepository.findOne({
            where: { id: id },
        });
        if (!currOrder) {
            throw new NotFoundException('not found order with id: ' + id);
        }
        if (currOrder.status !== OrderStatus.PREPARED) {
            throw new ForbiddenException('order is not set status delevering');
        }
        currOrder.status = OrderStatus.DELIVERING;
        currOrder.updatedBy = adminId;
        const result = await this.entityManager.transaction(
            async (entityManager) => {
                const queryRunner: QueryRunner = entityManager.queryRunner;
                await queryRunner.startTransaction();
                try {
                    await entityManager.save(Order, currOrder);
                    const findOrrderItems = await entityManager.find(
                        OrderItem,
                        {
                            where: { orderId: { id: currOrder.id } },
                            relations: { productAttributeDefault: true },
                            select: {
                                productAttributeDefault: {
                                    id: true,
                                    orderNumber: true,
                                    productDetailId: true,
                                },
                                number: true,
                            },
                        },
                    );
                    for (let item of findOrrderItems) {
                        const attributesDefault =
                            await this.attributeDefaultService.getAttributeDefaultById(
                                (
                                    item.productAttributeDefault as ProductAttributeDefault
                                ).id,
                            );
                        attributesDefault.orderNumber =
                            attributesDefault.orderNumber - item.number;
                        attributesDefault.inventoryNumber =
                            attributesDefault.inventoryNumber - item.number;
                        await entityManager.save(
                            ProductAttributeDefault,
                            attributesDefault,
                        );
                        const product = await entityManager.findOne(Product, {
                            where: {
                                productDetail: {
                                    id: (
                                        item.productAttributeDefault as ProductAttributeDefault
                                    ).productDetailId as number,
                                },
                            },
                        });
                        product.sellOfQuantity += item.number;
                        await entityManager.save(Product, product);
                    }
                    await queryRunner.commitTransaction();
                    return currOrder;
                } catch (error) {
                    await queryRunner.rollbackTransaction();
                    throw new HttpException(
                        'update  failed',
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        { cause: error },
                    );
                }
            },
        );
        return result;
    }

    async updateOrderWithStatusReceived(
        id: number,
        owerId: number,
    ): Promise<Order> {
        const currOrder = await this.orderRepository.findOne({
            where: { id: id, owerId: { id: owerId } },
        });
        if (!currOrder) {
            throw new NotFoundException('you dont have order with id' + id);
        }
        currOrder.status = OrderStatus.RECEIVED;
        return await this.orderRepository.save(currOrder);
    }

    async deleteOrderWhenPaymentFailed(
        id: number,
        owerId: number,
    ): Promise<Order> {
        const currOrder = await this.orderRepository.findOne({
            where: { id: id, owerId: { id: owerId } },
        });
        if (!currOrder) {
            throw new NotFoundException('you dont have order with id' + id);
        }
        if (currOrder.status !== OrderStatus.PREPARED) {
            throw new ForbiddenException(
                ' you do not delete order with status ' + currOrder.status,
            );
        }
        const result = await this.entityManager.transaction(
            async (entityManager) => {
                const queryRunner: QueryRunner = entityManager.queryRunner;
                await queryRunner.startTransaction();
                try {
                    const cancelOrder = await entityManager.remove(
                        Order,
                        currOrder,
                    );
                    const findOrrderItems = await entityManager.find(
                        OrderItem,
                        {
                            where: { orderId: { id: currOrder.id } },
                            relations: { productAttributeDefault: true },
                            select: {
                                productAttributeDefault: {
                                    id: true,
                                    orderNumber: true,
                                },
                                number: true,
                            },
                        },
                    );
                    // hoàn lại số đơn hàng
                    for (let item of findOrrderItems) {
                        const attributesDefault =
                            await this.attributeDefaultService.getAttributeDefaultById(
                                (
                                    item.productAttributeDefault as ProductAttributeDefault
                                ).id,
                            );
                        attributesDefault.orderNumber =
                            attributesDefault.orderNumber - item.number;
                        await entityManager.save(
                            ProductAttributeDefault,
                            attributesDefault,
                        );
                    }
                    await queryRunner.commitTransaction();
                    return cancelOrder;
                } catch (error) {
                    await queryRunner.rollbackTransaction();
                    throw new HttpException(
                        'update  failed',
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        { cause: error },
                    );
                }
            },
        );
        return result;
    }

    async getOrderByStatusFromUser(
        status: OrderStatus,
        owerId: number,
    ): Promise<Order[]> {
        if (!owerId) {
            throw new BadRequestException('not found id user in resquest');
        }
        return await this.orderRepository.find({
            where: { status: status, owerId: { id: owerId } },
            order: { createdAt: 'DESC' },
        });
    }

    async getOrderDetailByIdForUser(
        id: number,
        owerId: number,
    ): Promise<Order> {
        if (!id || !owerId) {
            throw new BadRequestException(
                ' not found order id or owerId in resquest',
            );
        }
        const order = await this.orderRepository.findOne({
            where: { id: id, owerId: { id: owerId } },
            relations: {
                orderItems: { productAttributeDefault: {
                    productDetailId: { productId: true}
                } },
                address: true,
                transactions: true
            },
            
        });
        if (!order) {
            throw new NotFoundException("you don't have id with id: " + id);
        }
        return order;
    }

    async getAllOrderFromAdmin(
        filterOrderDto: FilterOrderDto,
    ): Promise<Order[]> {
        return await this.orderRepository.find({
            where: { ...filterOrderDto.options },
            skip: filterOrderDto.skip,
            cache: filterOrderDto.limit,
            relations: {
                owerId: true,
            },
        });
    }

    async getOrderDetailsFromAdmin(id: number): Promise<Order> {
        if (!id) {
            throw new BadRequestException('not found id in router');
        }
        return await this.orderRepository.findOne({
            where: { id: id },
            relations: {
                orderItems: {
                    productAttributeDefault: { productDetailId: { productId: true}},
                },
                owerId: true,
                address: true,
                transactions: true
            },
        });
    }
}
