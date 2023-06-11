import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './cart-item.entity';
import { Repository } from 'typeorm';
import { CreateCartItemDto, UpdateCartItemDto } from './dto';

@Injectable()
export class CartItemsService {
    constructor(@InjectRepository(CartItem) private readonly cartItemRepository: Repository<CartItem>) {}
    
    async createCartItem(createCartItemDto: CreateCartItemDto, owerId: number): Promise<CartItem> {
        const findCartItem = await this.cartItemRepository.findOne({ where: { itemId: {id: createCartItemDto.itemId as number}, owerId: {id: owerId} }})
        if (findCartItem) {
            findCartItem.number += createCartItemDto.number;
            return await this.cartItemRepository.save(findCartItem)
        }

        const newCartItem = this.cartItemRepository.create(createCartItemDto)
        newCartItem.owerId = owerId
        return await this.cartItemRepository.save(newCartItem)
    }

    async updateCartItemById( id: number, updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
        const currCartItem = await this.cartItemRepository.findOne({ where: { id: id}})
        if (!currCartItem) {
            throw new NotFoundException('cart item not found in system')
        }
        return await this.cartItemRepository.save({
            ...currCartItem,
            ...updateCartItemDto
        })
    }

    async destroyCartItemById(id: number): Promise<CartItem> {
        const currCartItem = await this.cartItemRepository.findOne({ where: { id: id}})
        if (!currCartItem) {
            throw new NotFoundException('cart item not found in system')
        } 

        return await this.cartItemRepository.remove(currCartItem)
    }

    async getCartItemById(id: number): Promise<CartItem> {
        const cartItem = await this.cartItemRepository.findOne({ where: { id: id}})
        if (!cartItem) {
            throw new NotFoundException('cart item not found in system')
        } 
        return cartItem
    }

    // chỉnh sửa lại get
    // get all sắp xếp theo ngày tạo
    async getCartItemOfOwer(owerId: number): Promise<CartItem[]> {
        const cartItems = await this.cartItemRepository.find({ 
            where: {owerId: {id: owerId}}, 
            relations: [
                'productDetail'
            ]
        })
        return cartItems
    }
}
