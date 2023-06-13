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

    @Column({ nullable: true })
    @IsString()
    @MaxLength(50)
    description?: string;

    @Column()
    @IsEnum(MediaType)
    type: MediaType;

    @Column()
    @IsString()
    @IsNotEmpty()
    url: string;
}
