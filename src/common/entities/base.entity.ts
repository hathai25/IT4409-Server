import {
    BeforeRecover,
    BeforeSoftRemove,
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
    updatedAt: Date;
}

export class BaseEntity extends BaseCreatedAnUpdatedEntity {
    @Column({ default: false })
    deleted: boolean;
    @DeleteDateColumn()
    deletedAt: Date;

    @BeforeSoftRemove()
    updateDeletd() {
        this.deleted = true;
    }

    @BeforeRecover()
    recoverDeleted() {
        this.deleted = false;
    }
}
