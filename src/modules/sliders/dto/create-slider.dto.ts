import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
} from 'class-validator';
import { SliderType } from 'src/common/enum';
export class CreateSliderDto{
    @IsString()
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsNotEmpty()
    url: string;
}