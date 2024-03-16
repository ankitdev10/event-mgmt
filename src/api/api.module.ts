import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';
import { ErrorTypeResolver } from 'src/common/errors';
import { ServicesModule } from 'src/services/services.module';
import { UserService } from 'src/services/user.service';
import { AuthGuard } from './middlewares/auth.guard';
import { RequestContext } from './request-context';
import { ScheduleResolver } from './resolvers/schedule.resolver';
import { UserResolver } from './resolvers/user.resolver';

const resolvers = [UserResolver, ScheduleResolver];

@Module({
  imports: [
    ServicesModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [UserService],
      imports: [ServicesModule],
      useFactory: async (userService: UserService) => {
        return {
          playground: true,
          introspection: true,
          typePaths: ['./**/*.graphql'],
          resolvers: [ErrorTypeResolver, { JSON: GraphQLJSON }],
          context: async ({ req, res }) => {
            const ctx = new RequestContext({ req, res });

            // return ctx;
            // if the req has authorizatiom header then provide it to our self-made RequestContext
            try {
              if (ctx.req.headers.authorization) {
                const user = await userService.getSession(
                  ctx.req.headers.authorization,
                );
                ctx.user = user;
                return ctx;
              }
            } catch (error) {}
            return ctx;
          },
        };
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
