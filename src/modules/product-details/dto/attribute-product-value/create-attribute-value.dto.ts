import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAtrributeValueDto {
    @IsString()
    @IsNotEmpty()
    value: string;

    @IsNumber()
    @IsNotEmpty()
    productDetailId: number;

    @IsNumber()
    @IsNotEmpty()
    attributeId: number;
}
