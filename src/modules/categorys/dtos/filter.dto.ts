import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BasePageDto } from 'src/common/dtos/base-page.dto';
import { Like } from 'typeorm';

export class FilterDto extends BasePageDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsNumber()
    order: number;

    @IsOptional()
    @IsNumber()
    parentCategory: number;

    get options() {
        const options: any = {};
        if (this.name) {
            options.name = Like(`%${this.name}%`);
        }

        if (this.parentCategory) {
            options.parentCategory = this.parentCategory;
        }

        if (this.order) {
            options.order = this.order;
        }
        return options;
    }
}
