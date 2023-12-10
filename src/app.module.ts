import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersResolver } from './users/users.resolver';
import { PostsService } from './posts/posts.service';
import { UsersService } from './users/users.service';
import { PrismaService } from './prisma.service';
import { AuthController } from './auth/auth.controller';
import { TokenService } from './token/token.service';
import { PostsResolver } from './posts/posts.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      includeStacktraceInErrorResponses: false
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, UsersResolver, PostsResolver, PostsService, UsersService, PrismaService, TokenService],
})
export class AppModule {}
