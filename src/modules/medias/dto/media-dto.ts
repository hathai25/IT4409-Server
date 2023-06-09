import { Expose } from 'class-transformer';
import { IsUrl } from 'class-validator';
import { MediaType } from 'src/common/enum';

export class MediaDto {
    @Expose()
    id: number;

    @Expose()
    description: string;

    @Expose()
    type: MediaType;

    @Expose()
    @IsUrl()
    url: string;
}
