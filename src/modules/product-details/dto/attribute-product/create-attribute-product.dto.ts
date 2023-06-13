import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAttributeProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
