import { BaseCreatedByEntity } from 'src/common/entities';
import { Column, Entity } from 'typeorm';
import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
} from 'class-validator';
import { MediaType } from 'src/common/enum';

@Entity()
export class Slider extends BaseCreatedByEntity {
    @Column()
    @IsUrl()
    @IsNotEmpty()
    url: string;

    @Column({ default: MediaType.JPG })
    @IsEnum(MediaType)
    type: MediaType;

    @Column({ default: true })
    @IsBoolean()
    isShow: boolean;

    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;
}
