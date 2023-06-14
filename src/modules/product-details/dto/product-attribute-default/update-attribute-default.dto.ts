import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Media } from 'src/modules/medias/media.entity';

export class UpdateAttributeDefaultDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    color?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    size?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    inventoryNumber?: number;

    @Type(() => Media)
    mediaId?: Media | number;
}
