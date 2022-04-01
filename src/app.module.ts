import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import * as ormOptions from './config/orm';
import RepoModule from './repo.module';
import UserResolver from './resolvers/user.resolver';
import MessageResolver from './resolvers/message.resolver';
import { context } from './db/loaders';
import { ApolloDriver } from '@nestjs/apollo';

const gqlImports = [UserResolver, MessageResolver];

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepoModule,
    ...gqlImports,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
      installSubscriptionHandlers: true,
      context,
      driver: ApolloDriver,
    }),
  ],
})
export class AppModule {}
