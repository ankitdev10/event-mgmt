import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MutationCreateScheduleArgs } from 'src/generated';
import { ScheduleService } from 'src/services/schedule.service';

@Resolver()
export class ScheduleResolver {
  constructor(private scheduleService: ScheduleService) {}

  @Mutation()
  async createSchedule(@Args() args: MutationCreateScheduleArgs) {
    return this.scheduleService.createSchedule(args.input);
  }
}
