import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { MyContext } from "./types";

import { HelloResolver } from "./resolvers/hello";
import { Habit } from "./entities/Habit";
import { HabitResolver } from "./resolvers/habit";

const main = async () => {
  dotenv.config();

  await createConnection({
    type: "postgres",
    database: process.env.DB,
    logging: true,
    synchronize: true,
    entities: [Habit],
  });

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, HabitResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  let PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
};

main();
