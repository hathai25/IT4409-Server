import { IBaseRespone } from "./base-respone.interface";

export interface ISuccessRespone<T> extends IBaseRespone<T> {
   message: 'success';
}

