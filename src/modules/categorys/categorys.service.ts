import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { In, IsNull, Repository } from 'typeorm';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto, CreateCategoryDto, UpdateCategoryDto } from './dtos';

@Injectable()
export class CategorysService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async createCategory(
        createCategoryDto: CreateCategoryDto,
        adminId: number,
    ): Promise<Category> {
        const currCategory = await this.categoryRepository.findOne({
            where: { name: createCategoryDto.name },
            withDeleted: true,
        });
        if (currCategory) {
            throw new BadRequestException(
                'the category name is exist in system',
            );
        }
        const newCategory = new Category();
        newCategory.name = createCategoryDto.name;
        newCategory.description = createCategoryDto.description;
        newCategory.parentCategory = createCategoryDto.parentCategory;
        newCategory.order = createCategoryDto.order;
        newCategory.createdBy = adminId;

        return await this.categoryRepository.save(newCategory);
    }

    async updateCategoryById(
        updateCategoryDto: UpdateCategoryDto,
        categoryId: number,
        adminId: number,
    ): Promise<Category> {
        const category = await this.findCategoryById(categoryId);
        return await this.categoryRepository.save({
            ...category,
            ...updateCategoryDto,
            updatedBy: adminId,
        });
    }

    async softDeleteCategoryById(
        categoryId: number,
        adminId: number,
    ): Promise<Category> {
        const category = await this.findCategoryById(categoryId);
        const softDeleteCategory = await this.categoryRepository.softRemove(
            category,
        );
        if (!softDeleteCategory) {
            throw new InternalServerErrorException(
                `have error to soft delete category`,
            );
        }
        return await this.categoryRepository.save({
            ...softDeleteCategory,
            deletedBy: adminId,
        });
    }

    async restoreSoftDeleteCategoryById(categoryId: number): Promise<Category> {
        const softDeleteCategory = await this.findSoftDeleteCategoryById(
            categoryId,
        );
        const restoreCategory = await this.categoryRepository.recover(
            softDeleteCategory,
        );
        return await this.categoryRepository.save(restoreCategory);
    }

    async destroyCategoryById(categoryId: number): Promise<Category> {
        const softDeleteCategory = await this.findSoftDeleteCategoryById(
            categoryId,
        );
        const destroyCategory = await this.categoryRepository.remove(
            softDeleteCategory,
        );
        return destroyCategory;
    }

    async findCategoryById(categoryId: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({
            where: { id: categoryId, deleted: false },
        });
        if (!category) {
            throw new NotFoundException(`category not found in system`);
        }
        return category;
    }

    async findSoftDeleteCategoryById(categoryId: number): Promise<Category> {
        const softDeleteCategory = await this.categoryRepository.findOne({
            where: { id: categoryId, deleted: true },
            withDeleted: true,
        });
        if (!softDeleteCategory) {
            throw new NotFoundException('category not found in trash');
        }
        return softDeleteCategory;
    }

    async findAllCategory(): Promise<Category[]> {
        const categorys = await this.categoryRepository.find();

        return categorys;
    }

    async findAllSoftDeleteCategory(filterDto: FilterDto): Promise<Category[]> {
        const softDeleteCategorys = await this.categoryRepository.find({
            where: {
                ...filterDto.options,
                deleted: true,
            },
            skip: filterDto.skip,
            take: filterDto.limit,
        });
        return softDeleteCategorys;
    }

    async findAllCategoriesLevelOne(): Promise<Category[]> {
        try {
            const categories = await this.categoryRepository.find({
                where: {
                    parentCategory: IsNull(),
                },
            });

            return categories;
        } catch (error) {
            throw new InternalServerErrorException(
                'have error to get categories',
            );
        }
    }

    async findCategoriesByIds(ids: number[]): Promise<Category[]> {
        const categories = await this.categoryRepository.find({
            where: { id: In(ids) },
        });
        return categories;
    }
}
