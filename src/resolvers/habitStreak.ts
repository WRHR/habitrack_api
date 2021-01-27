import { Streak } from "../entities/Streak";
import { Arg, Mutation, Resolver } from "type-graphql";
import { HabitStreak } from "../entities/HabitStreak";

@Resolver()
export class HabitStreakResolver {
  @Mutation(() => HabitStreak)
  async addToStreak(@Arg("streakId") streakId: number): Promise<HabitStreak> {
    let hs = await HabitStreak.create({ streakId });
    hs.save();
    let allhs = await HabitStreak.find({ streakId: streakId });
    if (allhs) {
      console.log(allhs);
    }
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
