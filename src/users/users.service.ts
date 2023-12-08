import { Injectable } from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { NewUserInput, UserPagination } from './users.model';
import { randomInt } from 'crypto';
import { hashSync } from 'bcrypt';
import { IAuthBody, IPayload } from 'src/auth/auth.model';

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
      cursor: {id: pagination.cursorId},
      take: pagination.take
    });
  }

  async createUser(data: NewUserInput): Promise<User> {
    const salt = randomInt(1000)
    data.password = hashSync(data.password, salt)
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
    const hashedPass = hashSync(authData.password, userData.salt);
    if (hashedPass !== userData.password) {
      throw new Error('Unauthorized');
    }
    return { 
      name: userData.name,
      email: userData.email,
      role: userData.role
    }
  }
}
