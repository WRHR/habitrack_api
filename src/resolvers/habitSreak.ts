import { Streak } from "src/entities/Streak";
import { Arg, Mutation, Resolver } from "type-graphql";
import { HabitStreak } from "../entities/HabitStreak";
import { StreakResolver } from "./streak";

@Resolver()
export class HabitStreakResolver {
  @Mutation(() => HabitStreak)
  async addToStreak(
    @Arg("habitId") habitId: number,
    @Arg("streakId") streakId: number
  ): Promise<HabitStreak> {
    let hs = await HabitStreak.create({ habitId, streakId });
    hs.save();
    let streak = await Streak.findOne({ id: streakId });
    let sMax = streak?.highestStreak;
    if (streak) {
      let sCurrent = streak.currentStreak + 1;
      if (streak.highestStreak < streak.currentStreak) {
        sMax = streak.currentStreak;
      }
      Streak.update(
        { id: streakId },
        { highestStreak: sMax, currentStreak: sCurrent }
      );
    }

    return hs;
  }
}
