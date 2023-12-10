import { Injectable } from '@nestjs/common';
import { NewPostInput } from './posts.model';
import { PrismaService } from 'src/prisma.service';

const PAGE_SIZE = 10;

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    async createPost(post: NewPostInput) {
        return this.prisma.post.create({ data: post });
    }

    async getPosts(cursor = 0, take = PAGE_SIZE) {
        return this.prisma.post.findMany({
            take,
            skip: cursor * take,
            include: {
                author: true
            }
        })
    }

    async getViewedPosts(userId: number, cursor = 0, take = PAGE_SIZE) {
        const viewedPosts = await this.prisma.view.findMany({ where: {userId}, take, skip: cursor * take, include: { post: true, user: false}})
        return viewedPosts.map(post => post.post);
    }

    async viewPost(id: number) {
        return this.prisma.post.findUnique({
            where: {
                id
            },
            include: {
                author: true
            }
        });
    }

    async markPostViewed(postId: number, userId: number) {
        return this.prisma.view.create({
            data: {
                postId,
                userId,
            }
        })
    }
}
