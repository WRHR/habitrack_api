import { Streak } from "../entities/Streak";
import { MyContext } from "../types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

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
      habitId,
    });
    streak.save();

    return streak;
  }

  @Mutation(() => Streak)
  async updateStreakValues(@Arg("id") id: number): Promise<Streak | undefined> {
    let streak = await Streak.findOne({ id });
    let sMax = streak?.highestStreak;
    if (streak) {
      let sCurrent = streak.currentStreak + 1;
      if (streak.highestStreak < streak.currentStreak) {
        sMax = streak.currentStreak;
      }
      Streak.update({ id }, { highestStreak: sMax, currentStreak: sCurrent });
    }
    return await Streak.findOne({ id });
  }
}
