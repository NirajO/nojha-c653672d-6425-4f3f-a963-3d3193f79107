import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '@org/data/src/lib/users/user.entity.js';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Organization, (org) => org.children, { nullable: true})
  parent?: Organization;

  @OneToMany(() => Organization, (org) => org.parent)
  children!: Organization[];
}
