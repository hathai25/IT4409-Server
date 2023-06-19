import {
    IsArray,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';

export class UpdateReviewDto {
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
}
