import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export enum SortType {
    ASC = 'ASC',
    DESC = 'DESC',
}

export class BasePageDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform((v) => +v.value)
    readonly page = 1;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform((v) => +v.value)
    readonly limit = 10;

    @IsOptional()
    @IsEnum(SortType)
    readonly sort = SortType.DESC;

    @IsOptional()
    @IsString()
    readonly sortBy = 'createdAt';

    get skip() {
        return (this.page - 1) * this.limit;
    }
}
