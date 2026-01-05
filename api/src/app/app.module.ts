import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { User, Organization } from '@org/data';
import { AuthModule } from '../auth/auth.module';
import { SeedService } from './seed/seed.service';
import { Task } from './tasks/task.entity';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User, Organization, Task]),
    AuthModule,
    TasksModule,
    User,
    Organization,
  ],
})
export class AppModule {}

