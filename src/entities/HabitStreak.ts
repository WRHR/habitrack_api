import { CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Habit } from "./Habit";
import { Streak } from "./Streak";

@ObjectType()
@Entity()
export class HabitStreak {
  @ManyToOne(() => Habit, (habit) => habit.streakConnection)
  habit: Habit;

  @ManyToOne(() => Streak, (streak) => streak.habitConnection)
  streak: Streak;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
