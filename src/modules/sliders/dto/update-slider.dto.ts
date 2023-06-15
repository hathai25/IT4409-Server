import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
} from 'class-validator';
import { MediaType } from 'src/common/enum';
export class UpdateSliderDto {
    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUrl()
    @IsNotEmpty()
    url?: string;

    @IsOptional()
    @IsEnum(MediaType)
    @IsNotEmpty()
    type?: MediaType;

    @IsOptional()
    @IsBoolean()
    isShow?: boolean;
}
