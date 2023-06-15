import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
} from 'class-validator';
import { MediaType } from 'src/common/enum';
export class CreateSliderDto {
    @IsOptional()
    @IsString()
    description?: string;

    @IsUrl()
    @IsNotEmpty()
    url: string;

    @IsOptional()
    @IsEnum(MediaType)
    @IsNotEmpty()
    type?: MediaType;
}
