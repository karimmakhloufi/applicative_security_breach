import { ApolloError } from "apollo-server";
import { JwtPayload } from "jsonwebtoken";
import { Resolver, Query, Ctx } from "type-graphql";
import { Post } from "../Entities/Post";

const posts: Post[] = [
  {
    message: "The Awakening",
    author: "Kate Chopin",
  },
  {
    message: "City of Glass",
    author: "Paul Auster",
  },
];

@Resolver(() => Post)
export class PostResolver {
  @Query(() => [Post])
  async posts(@Ctx() ctx: JwtPayload) {
    console.log(ctx);
    if (ctx && ctx.authenticatedUserEmail) {
      return posts;
    } else {
      return new ApolloError("Not Authorized");
    }
  }
}
