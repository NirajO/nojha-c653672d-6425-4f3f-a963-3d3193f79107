import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User, Organization } from '@org/data'; 

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Organization, { eager: true })
  organization!: Organization;

  @ManyToOne(() => User, { eager: true })
  createdBy!: User;

  @CreateDateColumn()
  createdAt!: Date;
}
