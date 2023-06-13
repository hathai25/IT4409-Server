import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAttributeProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
