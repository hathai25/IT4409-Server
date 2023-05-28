import { Expose } from "class-transformer";
import { Category } from "../category.entity";

export class CategoryDto {
    @Expose()
    name: string;
    
    @Expose()
    description: string;

    @Expose()
    order: number;

    @Expose()
    parentCategory: Category | null | number;
}