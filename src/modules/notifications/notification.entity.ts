import { BaseCreatedAnUpdatedEntity } from 'src/common/entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/entity/users.entity';
import { Admin } from '../admin/admin.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Notification extends BaseCreatedAnUpdatedEntity {
    @Column()
    @IsString()
    @IsNotEmpty()
    content: string;

    @Column()
    @IsString()
    topicUrl: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
    owner: User;

    @ManyToOne(() => Admin, { onDelete: 'NO ACTION' })
    updatedBy: Admin;
}
