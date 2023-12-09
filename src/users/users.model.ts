import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { UserRole } from "@prisma/client";
import { Post } from "src/posts/posts.model";

@ObjectType({ description: 'user' })
export class User {

  @Field(type => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string; // unique

  @Field()
  password: string;

  @Field()
  role: UserRole;

  @Field(type => Post)
  posts: Post[];
}

@InputType({ description: 'user' })
export class NewUserInput {
  @Field()
  name: string;

  @Field()
  email: string; // unique

  @Field()
  password: string;

  @Field()
  role: UserRole;

  @Field({nullable: true})
  salt: string;
}

@InputType({ description: 'offset pagination' })
export class UserPagination {
  @Field({ nullable: true })
  cursorId: number;

  @Field({ nullable: true })
  take: number;
}