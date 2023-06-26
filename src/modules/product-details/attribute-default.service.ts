import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAttributeDefault } from './entities/product-attribute-default.entity';
import { Repository } from 'typeorm';
import {
    CreateAttributeDefaultDto,
    UpdateAttributeDefaultDto,
} from './dto/product-attribute-default';

@Injectable()
export class AttributeDefaultsService {
    constructor(
        @InjectRepository(ProductAttributeDefault)
        private readonly attributeDefaultRepository: Repository<ProductAttributeDefault>,
    ) {}

    async createProductAttributeDefault(
        createAttributeDefaultDto: CreateAttributeDefaultDto,
    ): Promise<ProductAttributeDefault> {
        const findAttributeDefault =
            await this.attributeDefaultRepository.findOne({
                where: {
                    productDetailId: {
                        id: createAttributeDefaultDto.productDetailId,
                    },
                    color: createAttributeDefaultDto.color,
                    size: createAttributeDefaultDto.size,
                },
            });
        if (findAttributeDefault) {
            throw new BadRequestException(
                'product detail with id have a default value',
            );
        }
        const newAttributeDefault = this.attributeDefaultRepository.create(
            createAttributeDefaultDto,
        );
        return await this.attributeDefaultRepository.save(newAttributeDefault);
    }

    async updateAttributeDefaultById(
        id: number,
        updateAttributeDefaultDto: UpdateAttributeDefaultDto,
    ): Promise<ProductAttributeDefault> {
        const findAttributeDefault =
            await this.attributeDefaultRepository.findOne({
                where: { id: id },
            });
        if (!findAttributeDefault) {
            throw new NotFoundException('attribute default  not found');
        }

        return await this.attributeDefaultRepository.save({
            ...findAttributeDefault,
            ...updateAttributeDefaultDto,
        });
    }

    async destroyAttributeDefaultById(
        id: number,
    ): Promise<ProductAttributeDefault> {
        const findAttributeDefault =
            await this.attributeDefaultRepository.findOne({
                where: { id: id },
            });
        if (!findAttributeDefault) {
            throw new NotFoundException('attribute default  not found');
        }

        return await this.attributeDefaultRepository.remove(
            findAttributeDefault,
        );
    }

    async getAttributeDefaultById(
        id: number,
    ): Promise<ProductAttributeDefault> {
        const findAttributeDefault =
            await this.attributeDefaultRepository.findOne({
                where: { id: id },
            });
        if (!findAttributeDefault) {
            throw new NotFoundException('attribute default  not found');
        }

        return findAttributeDefault;
    }

    async getAllAttributeDefaultByProductDetailId(
        productDetailId: number,
    ): Promise<ProductAttributeDefault[]> {
        const attributeDefaults = await this.attributeDefaultRepository.find({
            where: { productDetailId: { id: productDetailId } },
        });
        return attributeDefaults;
    }
}
