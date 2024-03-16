import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import { Schedule } from 'src/entities/schedule.entity';
import { CreateScheduleInput } from 'src/generated';
import { DataSource, Repository } from 'typeorm';
import { UserService } from './user.service';

@Injectable()
export class ScheduleService {
  private scheduleRepo: Repository<Schedule>;
  private userRepo: Repository<User>;

  constructor(
    private userService: UserService,
    private dataSource: DataSource,
  ) {
    this.userRepo = this.dataSource.getRepository(User);
    this.scheduleRepo = this.dataSource.getRepository(Schedule);
  }

  async createSchedule(input: CreateScheduleInput) {
    const schedule = this.scheduleRepo.create(input);
    console.log(schedule);
    return await this.scheduleRepo.save(schedule);
  }
}
