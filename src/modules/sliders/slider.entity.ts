import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
} from 'class-validator';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';




// sửa lại cho hợp lí
@Entity()
export class Slider {
  @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @MaxLength(50)
    description?: string;

    @Column({ unique: true })
    @IsString()
    @IsNotEmpty()
    url: string;

}
