import { Column } from "typeorm";

export class BaseEntity {
    @Column()
    createdBy: string;

    @Column()
    updatedBy: string;

    @Column()
    createdAt: Date;

    @Column()
    updateAt: Date;
}
    
