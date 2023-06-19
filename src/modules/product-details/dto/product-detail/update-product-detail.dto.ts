import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateProductDetailDto {
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    medias?: string[];
}
