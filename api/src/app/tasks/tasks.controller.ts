import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RbacGuard, Roles } from '@org/auth';
import { Role } from '@org/data';
import type { AuthRequest } from '../../auth/auth-request.interface';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RbacGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Roles(Role.OWNER, Role.ADMIN)
  create(
    @Req() req: AuthRequest,
    @Body('title') title: string,
    @Body('description') description?: string
  ) {
    return this.tasksService.create(req.user, title, description);
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.tasksService.findAll(req.user);
  }

  @Delete(':id')
  @Roles(Role.OWNER)
  remove(@Req() req: AuthRequest, @Param('id') id: number) {
    return this.tasksService.remove(req.user, Number(id));
  }
}