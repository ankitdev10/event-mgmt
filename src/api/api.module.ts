import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ErrorTypeResolver } from 'src/common/errors';
import { ServicesModule } from 'src/services/services.module';
import { AuthGuard } from './middlewares/auth.guard';
import { UserResolver } from './resolvers/user.resolver';

const resolvers = [UserResolver];

@Module({
  imports: [
    ServicesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
      resolvers: [ErrorTypeResolver],
      context: ({ req, res }) => ({ req, res }),
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
