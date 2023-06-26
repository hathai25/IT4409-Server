import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { BasePageDto } from 'src/common/dtos';
import { Equal, Not } from 'typeorm';

export class FilterReviewDto extends BasePageDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(5)
    rate?: number;

    @IsOptional()
    // @IsBoolean()
    isContent?: boolean;

    @IsOptional()
    @IsBoolean()
    isMedia?: boolean;

    get options() {
        const options: any = {};
        if (this.rate) {
            options.rate = Equal(this.rate);
        }
        if (this.isContent) {
            options.content = Not(null);
        }
        if (this.isMedia) {
            options.medias = Not(null);
        }
        return options;
    }
}
