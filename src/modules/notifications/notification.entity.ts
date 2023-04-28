import { BaseCreatedAnUpdatedEntity } from "src/common/entities";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/entity/users.entity";
import { Admin } from "../admin/admin.entity";

@Entity()
export class Notification extends BaseCreatedAnUpdatedEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    topicUrl: string;

    @ManyToOne(() => User) 
    owner: User;

    @ManyToOne(() => Admin)
    updatedBy: Admin;
}
