import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { NewUserInput, UserPagination } from './users.model';
import { hash, genSalt, compare } from 'bcrypt';
import { IAuthBody, IPayload } from 'src/auth/auth.model';
import { promisify } from 'util';

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

  async users(pagination: UserPagination): Promise<User[]> {
    return this.prisma.user.findMany({
      ...(pagination ? { cursor: {id: pagination.cursorId} } : {}),
      ...(pagination ? { take: pagination.take } : {})
    });
  }

  async createUser(data: NewUserInput): Promise<User> {
    const salt = await genSalt(8);
    data.password = await hash(data.password, salt)
    data.salt = salt;
    return this.prisma.user.create({
      data,
    });
  }

  async authorizeUser(authData: IAuthBody): Promise<IPayload> {
    const userData = await this.prisma.user.findUnique({
      where: {
        email: authData.email
      }
    })
    const res = await compare(authData.password, userData.password);
    if (res) return {
      name: userData.name,
      email: userData.email,
      role: userData.role
    }
    else throw new UnauthorizedException();
  }
}
