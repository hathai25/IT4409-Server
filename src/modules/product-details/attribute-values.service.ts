import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttributeProductValue } from './entities/attribute-product-value.entity';
import { Repository } from 'typeorm';
import {
    CreateAtrributeValueDto,
    updateAtrributeValueDto,
} from './dto/attribute-product-value';

@Injectable()
export class AttributeValuesService {
    constructor(
        @InjectRepository(AttributeProductValue)
        private readonly attributeValueRepository: Repository<AttributeProductValue>,
    ) {}

    async createAttributeValue(
        createAttributeValueDto: CreateAtrributeValueDto,
    ): Promise<AttributeProductValue> {
        const findValue = await this.attributeValueRepository.findOne({
            where: {
                value: createAttributeValueDto.value,
                productDetailId: {
                    id: createAttributeValueDto.productDetailId,
                },
                attributeId: { id: createAttributeValueDto.attributeId },
            },
        });
        if (findValue) {
            throw new BadRequestException(
                'attribute value is exsit in product detail',
            );
        }

        const newValue = this.attributeValueRepository.create(
            createAttributeValueDto,
        );
        return await this.attributeValueRepository.save(newValue);
    }

    async updateAttributeValueById(
        id: number,
        updateAttributeValueDto: updateAtrributeValueDto,
    ): Promise<AttributeProductValue> {
        const currValue = await this.attributeValueRepository.findOne({
            where: { id: id },
        });
        if (!currValue) {
            throw new NotFoundException('value not found');
        }
        return await this.attributeValueRepository.save({
            ...currValue,
            ...updateAttributeValueDto,
        });
    }

    async destroyAttributeValueById(
        id: number,
    ): Promise<AttributeProductValue> {
        const currValue = await this.attributeValueRepository.findOne({
            where: { id: id },
        });
        if (!currValue) {
            throw new NotFoundException('value not found');
        }
        return await this.attributeValueRepository.remove(currValue);
    }

    async getAttributeValueaById(id: number): Promise<AttributeProductValue> {
        const value = await this.attributeValueRepository.findOne({
            where: { id: id },
        });
        if (!value) {
            throw new NotFoundException('value not found');
        }
        return value;
    }

    async getAllAttributeValuesByProductDetilId(
        productDetialId: number,
    ): Promise<AttributeProductValue[]> {
        const values = await this.attributeValueRepository.find({
            where: { productDetailId: { id: productDetialId } },
            relations: { attributeId: true },
            select: { attributeId: { id: true, name: true } },
        });
        return values;
    }
}
