import { ID } from 'src/common/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: ID;

  @Column('simple-json', { default: [] })
  schedule: Record<string, string>[];

  @Column('date')
  weekStart: Date;

  //   @OneToOne(() => User)
  //   @JoinColumn()
  //   createdBy: User;

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;
}
