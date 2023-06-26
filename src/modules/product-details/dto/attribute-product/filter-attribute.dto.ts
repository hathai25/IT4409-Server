import { IsOptional, IsString } from 'class-validator';
import { BasePageDto } from 'src/common/dtos';
import { Like } from 'typeorm';

export class FilterAttributeDto extends BasePageDto {
    @IsOptional()
    @IsString()
    name?: string;

    get options() {
        const options: any = {};
        if (this.name) {
            options.name = Like(this.name);
        }
        return options;
    }
}
