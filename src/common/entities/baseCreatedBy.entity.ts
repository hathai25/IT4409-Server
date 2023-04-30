import { JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Admin } from 'src/modules/admin/admin.entity';

export abstract class BaseCreatedByEntity extends BaseEntity {
    @ManyToOne(() => Admin)
    @JoinColumn()
    createdBy: Admin;

    @ManyToOne(() => Admin)
    @JoinColumn()
    updateBy: Admin;

    @ManyToOne(() => Admin)
    @JoinColumn()
    deletedBy: Admin;
}
