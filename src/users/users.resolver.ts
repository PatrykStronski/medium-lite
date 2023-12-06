import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User, UserRole } from "./users.model";
import { UsersService } from "./users.service";
import { Prisma } from "@prisma/client";

const sampleUser = {
    id: 1,
    name: '1',
    email: '1', // unique
    password: '1',
    role: UserRole.admin,
    posts: []
} as User;

@Resolver(() => User)
export class UsersResolver {
    constructor(private usersService: UsersService) {}
  
    @Query(() => User)
    async user(@Args('id') id: number) {
      return await this.usersService.user(id);
    }

    @Query(() => [User])
    async users() {
        return await this.usersService.users();
    }

    @Mutation(() => User)
    async createUser(@Args({ name: 'user', type: () => User }) user: Prisma.UserCreateInput) {
        return await this.usersService.createUser(user)
    }
}