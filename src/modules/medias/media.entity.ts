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
    name: string;

    @Column({ nullable: true })
    @IsString()
    description: string;

    @Column()
    @IsEnum(MediaType)
    type: MediaType;

    @Column()
    @IsNumber()
    size: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    url: string;
}
