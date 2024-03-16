import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  MutationCreateUserArgs,
  MutationLoginArgs,
  QueryUserArgs,
} from 'src/generated';
import { UserService } from 'src/services/user.service';
import { Allow } from '../decorators/allow.decorator';
import { RequestContext } from '../request-context';

@Resolver()
export class UserResolver {
  constructor(private userSerice: UserService) {}

  @Mutation()
  async createUser(@Args() args: MutationCreateUserArgs) {
    return this.userSerice.createUser(args.input);
  }

  @Query()
  async user(@Args() args: QueryUserArgs) {
    return this.userSerice.user(args.id);
  }

  @Query()
  async users() {
    return this.userSerice.users();
  }

  @Allow()
  @Mutation()
  async login(@Args() args: MutationLoginArgs, @Context() ctx: RequestContext) {
    return this.userSerice.login(ctx, args.username, args.password);
  }
}
