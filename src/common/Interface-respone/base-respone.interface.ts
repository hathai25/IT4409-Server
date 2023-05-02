export interface IBaseRespone<T> {
    message: string,
    data: T[] | T,
}