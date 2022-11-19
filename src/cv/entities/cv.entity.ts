import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as Id } from 'uuid';
import { user } from './../../user/entities/user.entity';
@Entity('cv')
export class cv {
  @PrimaryGeneratedColumn()
  id = Id();
  @Column()
  name: string;
  @Column()
  firstname: string;
  @Column()
  Age: number;
  @Column()
  Cin: string;
  @Column()
  Job: string;
  @Column()
  path: string;
  @ManyToOne(() => user)
  user: user;
}
