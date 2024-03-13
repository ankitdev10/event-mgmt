import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MutationCreateUserArgs, QueryUserArgs } from 'src/generated';
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
}
