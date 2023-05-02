import { ISuccessRespone } from "../Interface-respone/success.interface";

export function dataToRespone<T>(data: T): ISuccessRespone<T>  {
    return {     
        message: 'success',
        data: data,
    }
}