import { IsBoolean } from 'class-validator';

export class ModifyShowDto {
    @IsBoolean()
    isShow: boolean;
}
