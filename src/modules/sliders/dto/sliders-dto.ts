import { Expose } from 'class-transformer';
import { IsUrl } from 'class-validator';
export class SliderDto{
    @Expose()
    id: number;

    @Expose()
    description: string;

    @Expose()
    @IsUrl()
    url: string;
}