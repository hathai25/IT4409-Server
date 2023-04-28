import { BaseEntity } from "src/common/entities";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Media } from "../medias/media.entity";
import { Admin } from "../admin/admin.entity";

@Entity()
export class Slider extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Media, {onDelete: 'CASCADE', orphanedRowAction: 'delete'})
    @JoinColumn()
    imageId : Media;
    
    @ManyToOne(() => Admin, {onDelete: 'NO ACTION'})
    @JoinColumn()
    createdBy: Admin
    
}