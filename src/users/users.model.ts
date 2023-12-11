import { Field, HideField, ID, InputType, ObjectType } from "@nestjs/graphql";
import { UserRole } from "@prisma/client";
import { IsEmail, IsEnum, IsNumber, IsPositive, IsString, MinLength } from "class-validator";
import { Post } from "src/posts/posts.model";

@ObjectType({ description: 'user' })
export class User {

  @Field(type => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string; // unique

  @HideField()
  password: string;

  @HideField()
  salt: string;

  @Field()
  role: UserRole;

  @Field(type => Post)
  posts: Post[];
}

@InputType({ description: 'user' })
export class NewUserInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string; // unique

  @Field()
  @MinLength(6)
  password: string;

  @Field()
  @IsEnum(UserRole)
  role: UserRole;

  @Field({ nullable: true })
  salt: string;
  }

@InputType({ description: 'offset pagination' })
export class UserPagination {
  @Field({ nullable: true })
  @IsPositive()
  cursorId: number;

  @Field({ nullable: true })
  @IsPositive()
  take: number;
}