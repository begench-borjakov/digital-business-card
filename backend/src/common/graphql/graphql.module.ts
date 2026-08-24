import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { HealthResolver } from './health.resolver';

@Module({
  imports: [
    NestGraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): ApolloDriverConfig => {
        const nodeEnv = configService.getOrThrow<string>('NODE_ENV');

        return {
          autoSchemaFile: true,
          sortSchema: true,
          graphiql: nodeEnv !== 'production',
        };
      },
    }),
  ],
  providers: [HealthResolver],
})
export class GraphqlModule {}
