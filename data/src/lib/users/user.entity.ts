import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Role } from '../data';
import { Organization } from '../organizations/organization.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true})
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: 'text',
    default: Role.VIEWER,
  })
  role!: Role;

  @ManyToOne(() => Organization, { eager: true})
  organization!: Organization;

  @CreateDateColumn()
  createdAt!: Date;
}

