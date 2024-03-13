import { ID } from 'src/common/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
