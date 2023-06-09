import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
} from 'class-validator';
import { SliderType } from 'src/common/enum';
export class UpdateSliderDto {
    @IsString()
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsNotEmpty()
    @IsOptional()
    url?: string;

}