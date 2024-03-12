import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ServicesModule } from 'src/services/services.module';
import { TestResolver } from './resolvers/test.resolver';

const resolvers = [TestResolver];

@Module({
  imports: [
    ServicesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
    }),
  ],
  providers: [...resolvers],
})
export class ApiModule {}
