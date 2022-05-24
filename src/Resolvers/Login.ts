import bcrypt from "bcrypt";
import { Resolver, Query, Arg } from "type-graphql";
import { ApolloError } from "apollo-server";
import jwt from "jsonwebtoken";
import { jwtKey } from "../../server";

const usersDB = [
  {
    email: "admin@gmail.com",
    hash: bcrypt.hashSync("p4ssw0rd", 10),
  },
];

@Resolver()
export class LoginResolver {
  @Query(() => String)
  login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): string {
    const user = usersDB.find((dbUser) => dbUser.email === email);
    if (user && bcrypt.compareSync(password, user.hash)) {
      const token = jwt.sign(
        {
          user: user.email,
        },
        jwtKey
      );
      return token;
    } else {
      throw new ApolloError("Invalid credentials");
    }
  }
}
