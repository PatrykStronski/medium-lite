import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: 'post' })
export class Post {
  @Field(type => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;
}