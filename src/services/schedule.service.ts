import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RequestContext } from 'src/api/request-context';
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

  async createSchedule(
    ctx: RequestContext,
    input: CreateScheduleInput,
  ): Promise<any> {
    const schedule = this.scheduleRepo.create(input);
    const { user } = ctx;
    if (!user) throw new UnauthorizedException();
    schedule.createdBy = ctx.user;

    // return await this.scheduleRepo.save(schedule);
  }

  async getAllSchedules() {
    return this.scheduleRepo.find({
      relations: ['createdBy'],
    });
  }
}
