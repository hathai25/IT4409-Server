import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class BaseCreatedAnUpdatedEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updateAt: Date;
}

export abstract class BaseEntity extends BaseCreatedAnUpdatedEntity {
    @Column({ default: false })
    deleted: boolean;
    @DeleteDateColumn()
    deletedAt: Date;
}
