import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities';
import { Column, Entity } from 'typeorm';

@Entity()
export class AttributeProduct extends BaseEntity {
    @Column({ nullable: false, unique: true })
    @IsString()
    @IsNotEmpty()
    name: string;
}
