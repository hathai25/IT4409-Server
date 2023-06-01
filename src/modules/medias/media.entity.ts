import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
} from 'class-validator';
import { MediaType } from 'src/common/enum/media-type.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @MaxLength(50)
    description: string;

    @Column()
    @IsEnum(MediaType)
    type: MediaType;

    @Column({unique: true})
    @IsString()
    @IsNotEmpty()
    url: string;
}
