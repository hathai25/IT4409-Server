import { BaseCreatedAnUpdatedEntity } from 'src/common/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './users.entity';
import {
    IsBoolean,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
} from 'class-validator';

@Entity()
export class Address extends BaseCreatedAnUpdatedEntity {
    @Column({ nullable: false })
    @IsString()
    @IsNotEmpty()
    country: string;

    @Column({ nullable: false })
    @IsString()
    @IsNotEmpty()
    provice: string;

    @Column({ nullable: false })
    @IsString()
    @IsNotEmpty()
    district: string;

    @Column({ nullable: false })
    @IsString()
    @IsNotEmpty()
    commune: string;

    @Column({ nullable: false })
    @IsString()
    @IsNotEmpty()
    detail: string;

    @Column({ default: false })
    @IsBoolean()
    isDefault: boolean;

    @Column({ nullable: false })
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @Column({ nullable: false })
    @IsPhoneNumber('VN')
    phone: string;

    @ManyToOne(() => User, (user) => user.address, {
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    })
    @JoinColumn()
    userId: User | number;
}
