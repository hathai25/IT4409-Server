import {
    IsEmail,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsUrl,
    MinLength,
} from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { brcyptHelper } from 'src/common/helper/bcrypt.helper';
import { Address } from './address.entity';
import { BaseEntity } from 'src/common/entities';

@Entity()
export class User extends BaseEntity {
    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column({ nullable: false })
    @IsString()
    @MinLength(6)
    password: string;

    @Column({ nullable: false, unique: true })
    @IsString()
    username: string;

    @Column({ nullable: true })
    @IsPhoneNumber()
    phone?: string;

    @Column({ nullable: true }) //should be nullable
    @IsOptional()
    @IsUrl()
    avatar?: string;

    @Column({ default: true })
    isActivity: boolean;

    @OneToMany(() => Address, (address) => address.userId)
    address?: Address[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await brcyptHelper.hash(this.password);
    }
}
