import {
    IsArray,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';

export class CreateReviewDto {
    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    rate?: number;

    @IsOptional()
    @IsArray()
    medias?: string[];

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    productId: number;
}
