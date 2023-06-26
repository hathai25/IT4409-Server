import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateAttributeDefaultDto {
    @IsString()
    @IsNotEmpty()
    color: string;

    @IsString()
    @IsNotEmpty()
    size: string;

    @IsInt()
    @Min(0)
    inventoryNumber: number;

    @IsString()
    @IsNotEmpty()
    mediaId?: string;

    @IsNumber()
    @IsNotEmpty()
    productDetailId: number;
}
