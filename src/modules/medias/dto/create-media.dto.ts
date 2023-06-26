import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
} from 'class-validator';
import { MediaType } from 'src/common/enum';

export class CreateMediaDto {
    @IsString()
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsNotEmpty()
    url: string;

    @IsEnum(MediaType)
    type: MediaType;
}
