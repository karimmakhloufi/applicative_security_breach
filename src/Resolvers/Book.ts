import { ApolloError } from "apollo-server";
import { JwtPayload } from "jsonwebtoken";
import { Resolver, Query, Ctx } from "type-graphql";
import { Book } from "../Entities/Book";

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

@Resolver(() => Book)
export class BookResolver {
  @Query(() => [Book])
  async books(@Ctx() ctx: JwtPayload) {
    console.log(ctx);
    if (ctx && ctx.authenticatedUserEmail) {
      return books;
    } else {
      return new ApolloError("Not Authorized");
    }
  }
}
