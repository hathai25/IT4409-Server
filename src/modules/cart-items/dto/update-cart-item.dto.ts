import { IsNumber, Min } from 'class-validator';

export class UpdateCartItemDto {
    @IsNumber()
    number: number;
}
