import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import jwt, { JwtPayload } from "jsonwebtoken";
import { BookResolver } from "./src/Resolvers/Book";
import { LoginResolver } from "./src/Resolvers/Login";

export const jwtKey = "my_secret_key_that_must_be_very_long";

async function bootstrap() {
  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [BookResolver, LoginResolver],
  });

  // Create GraphQL server
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      console.log(req.headers.authorization);
      const token = req.headers.authorization;
      if (token) {
        let payload: JwtPayload;
        try {
          payload = jwt.verify(token, jwtKey) as JwtPayload;
          return { authenticatedUserEmail: payload.user };
        } catch (err) {
          console.log("err", err);
          return {};
        }
      } else return {};
    },
  });

  // Start the server
  const { url } = await server.listen(4000);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
