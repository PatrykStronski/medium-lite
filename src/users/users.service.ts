import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { NewUserInput, UserPagination } from './users.model';
import { hash, genSalt, compare } from 'bcrypt';
import { AuthBodyDto, IPayload, TokenType } from 'src/auth/auth.model';
import { GraphQLError } from 'graphql';

const MAX_PAGE_SIZE = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(
    id: number,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id
      },
    });
  }

  async users(cursor = 0, take = MAX_PAGE_SIZE): Promise<User[]> {
    return this.prisma.user.findMany({
      cursor: {id: cursor},
      take
    });
  }

  async createUser(data: NewUserInput): Promise<User> {
    try {
      const salt = await genSalt(8);
      data.password = await hash(data.password, salt)
      data.salt = salt;
      return this.prisma.user.create({
        data,
      });
    } catch (e) {
      console.error(e)
      throw new GraphQLError('Cannot create user', { extensions: { code: '400' } });
    }
  }

  async authorizeUser(authData: AuthBodyDto): Promise<IPayload> {
    const userData = await this.prisma.user.findUnique({
      where: {
        email: authData.email
      }
    });
    if (!userData) {
      throw new UnauthorizedException({message: 'Wrong user or password'})
    }
    const res = await compare(authData.password, userData.password);
    if (res) return {
      type: TokenType.standard,
      userId: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role
    }
    else throw new UnauthorizedException({message: 'Wrong user or password'});
  }

  async createAdmin(admin: NewUserInput) {
    const salt = await genSalt(8);
    admin.password = await hash(admin.password, salt)
    admin.salt = salt;
    await this.prisma.user.upsert({
      where: {
        email: admin.email
      },
      create: admin,
      update: admin
    })
  }
}
