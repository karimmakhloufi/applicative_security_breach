import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Post {
  @Field()
  message: string;

  @Field()
  author: string;
}
