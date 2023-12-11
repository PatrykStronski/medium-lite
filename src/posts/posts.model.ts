import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { User } from "src/users/users.model";

@ObjectType({ description: 'post' })
export class Post {
  @Field(type => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(type => ID)
  authorId: number

  @Field(type => User)
  author: User
}

@InputType({ description: 'post' })
export class NewPostInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  content: string;

  @Field({ nullable: true })
  authorId?: number
}