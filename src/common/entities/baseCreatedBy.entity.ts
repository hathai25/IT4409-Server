import { JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Admin } from "src/modules/admin/admin.entity";

export class BaseCreatedByEntity extends BaseEntity {
    @ManyToMany(() => Admin)
    @JoinColumn()
    createdBy: Admin

    @ManyToOne(() => Admin)
    @JoinColumn()
    updateBy: Admin

    @ManyToOne(() => Admin)
    @JoinColumn()
    deletedBy: Admin
}