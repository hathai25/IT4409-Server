import { IsArray, IsEmail, IsString, MinLength } from 'class-validator';
import { BaseEntity } from 'src/common/entities';
import { Role } from 'src/common/enum';
import { brcyptHelper } from 'src/common/helper/bcrypt.helper';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

@Entity()
export class Admin extends BaseEntity {
    @Column({ nullable: false, unique: true })
    @IsEmail()
    email: string;

    @Column({ nullable: false })
    @IsString()
    @MinLength(6)
    password: string;

    @Column({
        type: 'simple-array',
        // default: `${Role.Admin}`
    })
    @IsArray()
    roles: Role[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await brcyptHelper.hash(this.password);
    }
}
