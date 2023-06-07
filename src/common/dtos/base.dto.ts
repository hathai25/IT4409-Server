import { Expose } from "class-transformer";
import { Admin } from "typeorm";

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
    deletedAt: Date;
}

export class BaseDto extends BaseWithDeletedDto {
    @Expose()
    createdBy: Admin | number;

    @Expose()
    updatedBy: Admin | number;

    @Expose()
    deletedBy: Admin | number;
}
