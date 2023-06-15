import { Expose, Type } from 'class-transformer';
import { IsUrl } from 'class-validator';
import { MediaType } from 'express';
import { BaseDto } from 'src/common/dtos';
import { Admin } from 'src/modules/admin/admin.entity';
import { AdminDto } from 'src/modules/admin/dtos';
export class SliderDto extends BaseDto {
    @Expose()
    description?: string;

    @Expose()
    @IsUrl()
    url: string;

    @Expose()
    type: MediaType;

    @Expose()
    isShow: boolean;

    @Expose()
    @Type(() => AdminDto)
    createdBy: number | AdminDto;

    @Expose()
    @Type(() => AdminDto)
    updatedBy: number | AdminDto;
}
