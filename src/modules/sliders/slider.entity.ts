import { BaseEntity } from 'src/common/entities';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Media } from '../medias/media.entity';
import { Admin } from '../admin/admin.entity';

// sửa lại cho hợp lí
@Entity()
export class Slider extends BaseEntity {
    @OneToOne(() => Media, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
    @JoinColumn()
    imageId: Media;

    @ManyToOne(() => Admin, { onDelete: 'NO ACTION' })
    @JoinColumn()
    createdBy: Admin;
}
