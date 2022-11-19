import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as Id } from 'uuid';
@Entity('user')
export class user {
  @PrimaryGeneratedColumn()
  id = Id();

  @Column()
  designation: string;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
}
