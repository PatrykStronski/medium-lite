import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private us: UsersService) {}

  async onApplicationBootstrap() {
    if (!process.env.INSERT_ADMIN) return;
    await this.us.createAdmin();
  }
}
