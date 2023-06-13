import { IsNotEmpty, IsString } from 'class-validator';

export class updateAtrributeValueDto {
    @IsString()
    @IsNotEmpty()
    value: string;
}
