import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { ComponentsModule } from './components/components.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      uploads: false,
      autoSchemaFile: true,
      formatError: (error) => {
        const originalError = error?.extensions?.originalError as { message?: string | string[] } | undefined;
        const graphQLFormattedError = {
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
          message: originalError?.message || error.message || 'Internal server error',
        };
        console.log('GraphQL Error:', graphQLFormattedError);
        return graphQLFormattedError;
      }
    }),
    ComponentsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule { }
