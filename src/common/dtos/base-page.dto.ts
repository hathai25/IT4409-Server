import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum SortType {
    ASC = 'ASC',
    DESC = 'DESC',
}

export class BasePageDto {
    @IsOptional()
    @IsNumber()
    readonly page: number;

    @IsOptional()
    @IsNumber()
    readonly limit: number;

    @IsOptional()
    @IsEnum(SortType)
    readonly sort: SortType;

    @IsOptional()
    @IsString()
    readonly sortBy: string;

    constructor(page = 1, limit = 10, sort = SortType.ASC, sortBy = 'id') {
        this.page = page;
        this.limit = limit;
        this.sort = sort;
        this.sortBy = sortBy;
    }

    get skip() {
        return (this.page - 1) * this.limit;
    }
}
