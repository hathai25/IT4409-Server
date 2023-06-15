import { Expose, Type } from 'class-transformer';
import { Admin } from 'src/modules/admin/admin.entity';
import { AdminDto } from 'src/modules/admin/dtos';

export class BaseCreateUpdateDto {
    @Expose()
    id: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}

export class BaseWithDeletedDto extends BaseCreateUpdateDto {
    @Expose()
    deleted: boolean;

    @Expose()
    deletedAt: Date | null;
}

export class BaseDto extends BaseWithDeletedDto {
    @Expose()
    createdBy: AdminDto | number;

    @Expose()
    updatedBy: AdminDto | number;

    @Expose()
    deletedBy: AdminDto | number;
}
