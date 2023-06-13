import { Expose } from 'class-transformer';
import { BaseWithDeletedDto } from 'src/common/dtos';

export class AttributeProductDto extends BaseWithDeletedDto {
    @Expose()
    name: string;
}
