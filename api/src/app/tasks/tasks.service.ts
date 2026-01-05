import { Injectable, ForbiddenException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './task.entity';
import { User } from '@org/data';
import { Role } from '@org/data';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>
  ) {}

  create(user: User, title: string, description?: string) {
    if (user.role === Role.VIEWER) {
      throw new ForbiddenException('Viewers cannot create tasks');
    }

    return this.taskRepo.save(
      this.taskRepo.create({
        title,
        description,
        organization: user.organization,
        createdBy: user,
      })
    );
  }

  findAll(user: User) {
    if (user.role === Role.OWNER) {
      return this.taskRepo.find();
    }

    return this.taskRepo.find({
      where: {
        organization: { id: user.organization.id},
      },
    });
  }

  async remove(user: User, taskId: number) {
    if (user.role !== Role.OWNER) {
      throw new ForbiddenException('Only owners can delete tasks');
    }

    await this.taskRepo.delete(taskId);
  }
}