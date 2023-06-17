import { Expose } from 'class-transformer';
import { BaseCreateUpdateDto } from 'src/common/dtos';

export class AddressDto extends BaseCreateUpdateDto {
    @Expose()
    country: string;

    @Expose()
    provice: string;

    @Expose()
    district: string;
    @Expose()
    commune: string;
    @Expose()
    detail: string;

    @Expose()
    fullname: string;

    @Expose()
    phone: string;

    @Expose()
    isDefault: boolean;

    @Expose()
    userId: number;
}
