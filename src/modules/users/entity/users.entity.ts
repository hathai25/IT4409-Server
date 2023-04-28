import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './address.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    @IsEmail()
    email: string;

    @Column({nullable: false})
    @IsString()
    @MinLength(6)
    password: string;

    @Column({nullable: false})
    @IsString()
    username: string;

    @Column({nullable: true})
    @IsPhoneNumber()
    phone: string;

    @OneToMany(() => Address, (address) => address.userId)
    address: Address[]; 

}
