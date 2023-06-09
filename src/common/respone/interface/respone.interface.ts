import { HttpStatus } from '@nestjs/common';

export interface ISuccessRespone<T> {
    message: string;
    data: T;
    path?: string;
    status?: HttpStatus;
    traceId?: string;
}

export interface IListData<T> {
    items: T[];
    totalItems: number;
}

export type ISuccessListRespone<T> = ISuccessRespone<IListData<T>>;

export interface IHttpError {
    key: string;
    errorCode: HttpStatus;
    message: string;
}

export interface IErrorRespone {
    message: string;
    errors: IHttpError[];
    path?: string;
    statusCode?: HttpStatus;
    traceId?: string;
}
