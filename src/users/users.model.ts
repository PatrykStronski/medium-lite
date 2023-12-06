import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Post } from "src/posts/posts.model";

export enum UserRole {
    admin = "admin",
    user = "user"
}
  
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
