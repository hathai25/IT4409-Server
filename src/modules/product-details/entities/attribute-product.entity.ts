import { BaseCreatedByEntity } from "src/common/entities";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AttributeProduct extends BaseCreatedByEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}