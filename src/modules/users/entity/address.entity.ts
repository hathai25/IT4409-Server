import { BaseCreatedAnUpdatedEntity } from 'src/common/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './users.entity';
import { IsNotEmpty, IsString } from 'class-validator';

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
    detail: string;

    @ManyToOne(() => User, (user) => user.address, {
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    })
    @JoinColumn()
    userId: User;
}
