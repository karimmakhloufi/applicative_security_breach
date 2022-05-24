import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Post {
  id: number;
  @Field()
  message: string;

  @Field()
  author: string;
}
