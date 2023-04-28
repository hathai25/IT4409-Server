import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseCreatedAnUpdatedEntity {
    @CreateDateColumn()
    createdAt: Date;  
    @UpdateDateColumn()
    updateAt: Date;
}

export class BaseEntity extends BaseCreatedAnUpdatedEntity {    
    @Column()
    deleted: boolean;
    @DeleteDateColumn()
    deletedAt: Date;
}

