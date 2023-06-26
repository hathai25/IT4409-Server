import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './cart-item.entity';
import { Repository } from 'typeorm';
import { CreateCartItemDto, UpdateCartItemDto } from './dto';

@Injectable()
export class CartItemsService {
    constructor(
        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,
    ) {}

    async createCartItem(
        createCartItemDto: CreateCartItemDto,
        owerId: number,
    ): Promise<CartItem> {
        const findCartItem = await this.cartItemRepository.findOne({
            where: {
                itemId: { id: createCartItemDto.itemId as number },
                owerId: { id: owerId },
            },
        });
        if (findCartItem) {
            findCartItem.number += createCartItemDto.number;
            return await this.cartItemRepository.save(findCartItem);
        }

        const newCartItem = this.cartItemRepository.create(createCartItemDto);
        newCartItem.owerId = owerId;
        return await this.cartItemRepository.save(newCartItem);
    }

    async updateCartItemById(
        id: number,
        updateCartItemDto: UpdateCartItemDto,
        owerId: number,
    ): Promise<CartItem> {
        const currCartItem = await this.cartItemRepository.findOne({
            where: { id: id, owerId: { id: owerId } },
            relations: {
                itemId: true,
            },
        });
        if (!currCartItem) {
            throw new NotFoundException('cart item not found in system');
        }

        if (currCartItem.number + updateCartItemDto.number < 0) {
            throw new BadRequestException(
                'the number must greater than number item',
            );
        }
        currCartItem.number += updateCartItemDto.number;
        return await this.cartItemRepository.save(currCartItem);
    }

    async destroyCartItemById(id: number, owerId: number): Promise<CartItem> {
        const currCartItem = await this.cartItemRepository.findOne({
            where: { id: id, owerId: { id: owerId } },
        });
        if (!currCartItem) {
            throw new NotFoundException('cart item not found in system');
        }

        return await this.cartItemRepository.remove(currCartItem);
    }

    async getCartItemById(id: number, owerId: number): Promise<CartItem> {
        const cartItem = await this.cartItemRepository.findOne({
            where: { id: id, owerId: { id: owerId } },
            relations: {
                itemId: {
                    productDetailId: {
                        productId: true,
                    },
                },
            },
        });
        if (!cartItem) {
            throw new NotFoundException('cart item not found in system');
        }
        return cartItem;
    }

    async getAllCartItemOfOwer(owerId: number): Promise<CartItem[]> {
        const cartItems = await this.cartItemRepository.find({
            where: { owerId: { id: owerId } },
            relations: {
                itemId: {
                    productDetailId: {
                        productId: true,
                    },
                },
            },
            order: {
                createdAt: 'DESC',
            },
        });
        return cartItems;
    }
}
