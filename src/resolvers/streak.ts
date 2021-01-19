import { Streak } from "../entities/Streak";
import {Habit} from '../entities/Habit'
import { HabitStreak } from "../entities/HabitStreak";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";

@Resolver()
export class StreakResolver {
  @Query(() => [Streak], { nullable: true })
  async myStreaks(@Ctx() { req }: MyContext) {
    return Streak.findOne({ userId: req.session.userId });
  }

  @Mutation(() => Streak)
  async createStreak(
    @Arg("habitId") habitId: number,
    @Ctx() { req }: MyContext
  ): Promise<Streak> {
    let streak = await Streak.create({
      userId: req.session.userId,
    });
    let habit = await Habit.findOne({id:habitId})

    await HabitStreak.create({habit, streak})

    return streak
  }
}
