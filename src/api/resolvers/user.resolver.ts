import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import {
  MutationCreateUserArgs,
  MutationLoginArgs,
  QueryUserArgs,
} from 'src/generated';
import { UserService } from 'src/services/user.service';

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

  @Mutation()
  async login(
    @Args() args: MutationLoginArgs,
    @Context() ctx: GraphQLExecutionContext,
  ) {
    return this.userSerice.login(ctx, args.username, args.password);
  }
}
