
import { IsEnum } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
export enum MediaType {

}

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description : string;

    @Column()
    @IsEnum(MediaType)
    type: MediaType

    @Column()
    size: number;

    @Column()
    url : string;

}
