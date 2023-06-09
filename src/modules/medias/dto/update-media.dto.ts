import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
} from 'class-validator';
import { MediaType } from 'src/common/enum';

export class UpdateMediaDto {
    @IsString()
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsNotEmpty()
    @IsOptional()
    url?: string;

    @IsEnum(MediaType)
    @IsOptional()
    type?: MediaType;
}
