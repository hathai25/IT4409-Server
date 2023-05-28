import { IsNumber } from 'class-validator';

export class IdDto {
    @IsNumber()
    readonly id: number;
}
