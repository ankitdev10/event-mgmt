import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ErrorTypeResolver } from 'src/common/errors';
import { ServicesModule } from 'src/services/services.module';
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
  providers: [...resolvers],
})
export class ApiModule {}
