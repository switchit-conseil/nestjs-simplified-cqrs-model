import {Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';

@Entity()
@Unique(['email'])
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 500, nullable: false})
    email: string;

    @Column({length: 500, nullable: false})
    password: string;

    @Column({nullable: false, default: false})
    isDeleted: boolean;
}
