import { ID } from 'src/common/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: ID;

  @Column('simple-json', { default: [] })
  schedule: Record<string, string>[];

  @Column('date')
  weekStart: Date;

  @ManyToOne(() => User, (user) => user.schedules)
  createdBy: User;

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;
}
