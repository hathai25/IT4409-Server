import { IsEnum } from "class-validator";
import { BaseCreatedAnUpdatedEntity } from "src/common/entities";
import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";

export enum Role {
    Admin = 'admin',
    SuperAdmin = 'super admin'
}

@Entity()
export class Admin extends BaseCreatedAnUpdatedEntity{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    email: string;
    
    @Column()
    password: string;

    @Column()
    @IsEnum(Role)
    role: Role

}