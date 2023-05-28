import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { BasePageDto } from 'src/common/dtos/base-page.dto';
import { Equal, Like } from 'typeorm';

export class FilterDto extends BasePageDto {
    @IsOptional()
    @IsString()
    readonly email?: string;

    @IsOptional()
    @IsString()
    readonly username?: string;

    @IsOptional()
    @IsPhoneNumber()
    readonly phone?: string;

    get options() {
        const options: any = {};
        if (this.email) {
            options.email = Like(`%${this.email}%`);
        }

        if (this.username) {
            options.username = Like(`%${this.username}%`);
        }

        if (this.phone) {
            options.phone = Equal(this.phone);
        }

        return options;
    }
}
