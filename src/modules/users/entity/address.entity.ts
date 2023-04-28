import { BaseCreatedAnUpdatedEntity } from "src/common/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";

@Entity()
export class Address extends BaseCreatedAnUpdatedEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: false})
    country: string;

    @Column({nullable: false})
    provice: string;

    @Column({nullable: false})
    district: string

    @Column({nullable: false})
    detail: string;

    @ManyToOne(() => User, (user) => user.address, { onDelete: 'CASCADE', orphanedRowAction: 'delete'})
    @JoinColumn()
    userId: User

}