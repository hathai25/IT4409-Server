import { Expose } from 'class-transformer';

export class GetMeDto {
    @Expose()
    userId: number;

    @Expose()
    email: string;

    @Expose()
    username: string;

    @Expose()
    avatar: string;
}
