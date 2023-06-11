import { IsNumber, Min } from "class-validator";

export class UpdateCartItemDto {
    @IsNumber()
    @Min(1)
    number: number;
}