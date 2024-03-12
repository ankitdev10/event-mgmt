import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { QueryGreetArgs } from 'src/generated';
import { TestService } from '../../services/test.service';

@Resolver()
export class TestResolver {
  constructor(private testService: TestService) {}
  @Query()
  async greet(@Context() ctx: Request, @Args() args: QueryGreetArgs) {
    return this.testService.greet(args);
  }
}
