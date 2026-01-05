import { Injectable, OnModuleInit} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User, Organization, Role } from '@org/data';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async onModuleInit() {
    const userCount = await this.userRepo.count();
    if (userCount > 0) return;

    // Create orgs
    const parentOrg = await this.orgRepo.save(
      this.orgRepo.create({ name: 'Parent Org'})
    );

    const childOrg = await this.orgRepo.save(
      this.orgRepo.create({
        name: 'Child Org',
        parent: parentOrg,
      })
    );

    const passwordHash = await bcrypt.hash('password', 10);

    // Create users
    await this.userRepo.save([
      this.userRepo.create({
        email: 'admin@test.com',
        password: passwordHash,
        role: Role.ADMIN,
        organization: parentOrg,
      }),
      this.userRepo.create({
        email: 'viewer@test.com',
        password: passwordHash,
        role: Role.VIEWER,
        organization: childOrg,
      }),
    ]);

    console.log('Seed data created');
  }
}