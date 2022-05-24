import { ApolloError } from "apollo-server";
import { JwtPayload } from "jsonwebtoken";
import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import { Post } from "../Entities/Post";

let posts: Post[] = [
  {
    id: 0,
    message: "Vends clio 3 2.2 L 135 000 km 2.500 € à débattre",
    author: "alice@gmail.com",
  },
  {
    id: 1,
    message: "Interréssé par la clio, contactez moi au 07.12.34.56.78",
    author: "bob@gmail.com",
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
  @Mutation(() => String)
  async editPostById(
    @Ctx() ctx: JwtPayload,
    @Arg("editPostByIdId") editPostByIdId: number,
    @Arg("newPost") newPost: string
  ) {
    if (ctx && ctx.authenticatedUserEmail) {
      posts = posts.map((post) => {
        if (post.id === editPostByIdId) {
          return { ...post, message: newPost };
        } else return post;
      });
      return "edited";
    } else {
      return new ApolloError("Not Authorized");
    }
  }
}
