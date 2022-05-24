import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Book {
  @Field()
  title: string;

  @Field()
  author: string;
}
