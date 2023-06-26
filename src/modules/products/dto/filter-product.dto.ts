import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BasePageDto } from 'src/common/dtos/base-page.dto';
import { Between, LessThanOrEqual, Like, MoreThanOrEqual } from 'typeorm';

export class FilterProductDto extends BasePageDto {
    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsNumber()
    readonly priceMin?: number;

    @IsOptional()
    @IsNumber()
    readonly priceMax?: number;

    @IsOptional()
    @IsNumber()
    readonly rateMin?: number;

    @IsOptional()
    @IsNumber()
    readonly rateMax?: number;

    get options() {
        const options: any = {};
        if (this.name) {
            options.email = Like(`%${this.name}%`);
        }

        if (this.priceMax && this.priceMin) {
            options.price = Between(this.priceMin, this.priceMax);
        } else if (this.priceMin) {
            options.price = MoreThanOrEqual(this.priceMin);
        } else if (this.priceMax) {
            options.price = LessThanOrEqual(this.priceMax);
        }

        if (this.rateMax && this.rateMin) {
            options.rate = Between(this.rateMin, this.rateMax);
        } else if (this.rateMin) {
            options.rate = MoreThanOrEqual(this.rateMin);
        } else if (this.rateMax) {
            options.rate = LessThanOrEqual(this.rateMax);
        }

        return options;
    }
}
