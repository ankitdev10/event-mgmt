import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MutationCreateScheduleArgs } from 'src/generated';
import { ScheduleService } from 'src/services/schedule.service';
import { RequestContext } from '../request-context';

@Resolver()
export class ScheduleResolver {
  constructor(private scheduleService: ScheduleService) {}

  @Mutation()
  async createSchedule(
    @Args() args: MutationCreateScheduleArgs,
    @Context() ctx: RequestContext,
  ) {
    return this.scheduleService.createSchedule(ctx, args.input);
  }

  @Query()
  async schedules() {
    return this.scheduleService.getAllSchedules();
  }
}
