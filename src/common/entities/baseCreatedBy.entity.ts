import { JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Admin } from 'src/modules/admin/admin.entity';

export abstract class BaseCreatedByEntity extends BaseEntity {
    @ManyToOne(() => Admin)
    @JoinColumn()
    createdBy: Admin | number;

    @ManyToOne(() => Admin)
    @JoinColumn()
    updateBy: Admin | number;

    @ManyToOne(() => Admin)
    @JoinColumn()
    deletedBy: Admin | number;
}
