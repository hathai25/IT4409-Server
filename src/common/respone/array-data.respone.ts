import { ISuccessRespone } from "../Interface-respone/success.interface";

export function arrayDataToRespone<T>(data: T[]): ISuccessRespone<T> {
    return {
        message: 'success',
        data: data,
    }
}