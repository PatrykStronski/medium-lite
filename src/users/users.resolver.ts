import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NewUserInput, User, UserPagination, UserRole } from "./users.model";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {
    constructor(private usersService: UsersService) {}
  
    @Query(() => User)
    async user(@Args('id') id: number) {
      return await this.usersService.user(id);
    }

    @Query(() => [User])
    async users(@Args('pagination') pagination: UserPagination) {
        return await this.usersService.users(pagination);
    }

    @Mutation(() => User)
    async createUser(@Args('user') user: NewUserInput) {
        return await this.usersService.createUser(user)
    }
}