import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { COOKIE_NAME, __prod__ } from "./constants";
import { MyContext } from "./types";

import { HelloResolver } from "./resolvers/hello";
import { Habit } from "./entities/Habit";
import { HabitResolver } from "./resolvers/habit";
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/user";
import { Streak } from "./entities/Streak";
import { HabitStreak } from "./entities/HabitStreak";
import { StreakResolver } from "./resolvers/streak";
import { HabitStreakResolver } from "./resolvers/habitStreak";

const main = async () => {
  dotenv.config();

  await createConnection({
    type: "postgres",
    database: process.env.DB,
    logging: true,
    synchronize: true,
    entities: [Habit, User, Streak, HabitStreak],
  });

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        sameSite: "lax", //csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: `blooptybloop`,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        HabitResolver,
        UserResolver,
        StreakResolver,
        HabitStreakResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
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
