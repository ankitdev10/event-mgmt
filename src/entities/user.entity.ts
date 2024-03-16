import { ID } from 'src/common/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: ID;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  emailAddress: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;
}
