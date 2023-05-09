import { Expose } from 'class-transformer';

export class AddressDto {
    @Expose()
    country: string;

    @Expose()
    provice: string;

    @Expose()
    district: string;

    @Expose()
    detail: string;

    @Expose()
    fullname: string;

    @Expose()
    phone: string;
}
