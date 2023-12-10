import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NewUserInput, User, UserPagination } from "./users.model";
import { UsersService } from "./users.service";
import { UseGuards } from "@nestjs/common";
import { AdminActivateGuard } from "src/guards/admin-activate.guard";

@Resolver(() => User)
export class UsersResolver {
    constructor(private usersService: UsersService) { }

    @Query(() => User)
    @UseGuards(AdminActivateGuard)
    async user(@Args('id') id: number) {
        return await this.usersService.user(id);
    }

    @Query(() => [User])
    @UseGuards(AdminActivateGuard)
    async users(@Args({ name: 'cursor', nullable: true }) cursor: number, @Args({ name: 'take', nullable: true }) take: number) {
        return await this.usersService.users(cursor, take);
    }

    @Mutation(() => User)
    @UseGuards(AdminActivateGuard)
    async createUser(@Args('user') user: NewUserInput) {
        return await this.usersService.createUser(user)
    }
}