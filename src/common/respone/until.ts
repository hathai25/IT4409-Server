import {
    ClassConstructor,
    ClassTransformOptions,
    plainToClass,
} from 'class-transformer';
import {
    IErrorRespone,
    IHttpError,
    ISuccessListRespone,
    ISuccessRespone,
} from './interface';
import { plainToClassFromExist } from 'class-transformer';

export function dataToInstance<T>(
    cls: ClassConstructor<T>,
    data: any,
    options?: {},
): T {
    if (!cls || !data) return undefined;
    let instance = new cls();

    instance = plainToClassFromExist(instance, data, options);

    return instance;
}

export function plainToInstance<T, V>(
    cls: ClassConstructor<T>,
    data: V,
    options?: ClassTransformOptions,
): T {
    if (!cls || !data) return undefined;

    return plainToClass(cls, data, options);
}

export function dataToRespone<T>(
    cls: ClassConstructor<T>,
    options?: ClassTransformOptions,
): (data: any) => ISuccessRespone<T> {
    options = options || { excludeExtraneousValues: true };

    return (data: any) => {
        data = plainToClass(cls, data, options);
        return {
            message: 'success',
            data: data,
        };
    };
}

export function arrDataToRespone<T>(
    cls: ClassConstructor<T>,
    options?: ClassTransformOptions,
): (data: any, totalItem: number) => ISuccessListRespone<T> {
    options = options || { excludeExtraneousValues: true };

    return (data: any, totalItem: number) => {
        data = plainToClass(cls, data, options);
        return {
            message: 'success',
            data: {
                items: data,
                totalItems: totalItem,
            },
        };
    };
}

export function errToRespone(
    errors: IHttpError[],
    message: string,
): IErrorRespone {
    return {
        message: message,
        errors: errors,
    };
}
