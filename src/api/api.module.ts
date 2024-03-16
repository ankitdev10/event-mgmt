import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';
import { ErrorTypeResolver } from 'src/common/errors';
import { ServicesModule } from 'src/services/services.module';
import { AuthGuard } from './middlewares/auth.guard';
import { RequestContext } from './request-context';
import { ScheduleResolver } from './resolvers/schedule.resolver';
import { UserResolver } from './resolvers/user.resolver';

const resolvers = [UserResolver, ScheduleResolver];

@Module({
  imports: [
    ServicesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
      resolvers: [ErrorTypeResolver, { JSON: GraphQLJSON }],
      context: ({ req, res }) => {
        const ctx = new RequestContext({ req, res, user: undefined });
        return ctx;
      },
    }),
  ],
  providers: [
    ...resolvers,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class ApiModule {}
