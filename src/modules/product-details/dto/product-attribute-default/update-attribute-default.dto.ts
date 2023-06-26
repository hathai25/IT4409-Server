import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateAttributeDefaultDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    color?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    size?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    inventoryNumber?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    mediaId?: string;
}
