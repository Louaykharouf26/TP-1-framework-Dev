import { cv } from './../../cv/entities/cv.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as Id } from 'uuid';
@Entity('skill')
export class skill {
  @PrimaryGeneratedColumn()
  id = Id();
  @Column()
  designation: string;
  @ManyToMany(() => cv)
  @JoinTable({
    name: 'Cv_skill',
    joinColumn: { name: 'cv', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'skill', referencedColumnName: 'id' },
  })
  cv: cv;
}
