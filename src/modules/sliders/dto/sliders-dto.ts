import { Expose } from 'class-transformer';
import { IsUrl } from 'class-validator';
import { SliderType } from 'src/common/enum';
export class SliderDto{
    @Expose()
    id: number;

    @Expose()
    description: string;

    @Expose()
    @IsUrl()
    url: string;
}