import { Exclude, Expose } from "class-transformer";

export class AdminDto {
    @Expose()
    email: string;

    @Exclude()
    password: string;
}