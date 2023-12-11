import { Args, GqlExecutionContext, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ExecutionContext, Req, UseGuards, createParamDecorator } from "@nestjs/common";
import { AdminActivateGuard } from "src/guards/admin-activate.guard";
import { NewPostInput, Post } from "./posts.model";
import { PostsService } from "./posts.service";
import { UserActivateGuard } from "src/guards/user-activate.guard";

export const UserId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = GqlExecutionContext.create(ctx).getContext().req;
        return request.user.userId;
    },
);

@Resolver(() => Post)
export class PostsResolver {
    constructor(private postsService: PostsService) {}
  
    @Mutation(() => Post)
    @UseGuards(UserActivateGuard)
    async newPost(@Args('post') post: NewPostInput, @UserId() userId: number) {
        post.authorId = userId;
        return await this.postsService.createPost(post);
    }

    @Query(() => [Post])
    @UseGuards(UserActivateGuard)
    async getPosts(@Args({name: 'cursor', nullable: true}) cursor: number, @Args({name: 'take', nullable: true}) take: number) {
        return await this.postsService.getPosts(cursor, take);
    }

    @Query(() => Post)
    @UseGuards(AdminActivateGuard)
    async viewPost(@Args('postId') postId: number, @UserId() userId: number) {
        const post = await this.postsService.viewPost(postId);
        await this.postsService.markPostViewed(postId, userId);
        return post;
    }

    @Query(() => [Post])
    @UseGuards(AdminActivateGuard)
    async getViewedPosts(@Args({name: 'cursor', nullable: true}) cursor: number, @Args({name: 'take', nullable: true}) take: number, @UserId() userId: number) {
        return await this.postsService.getViewedPosts(userId, cursor, take);
    }
}