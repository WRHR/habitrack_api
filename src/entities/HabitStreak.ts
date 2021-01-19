import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Habit } from "./Habit";
import { Streak } from "./Streak";

@ObjectType()
@Entity()
export class HabitStreak extends BaseEntity{
  @PrimaryColumn()
  habitId: number;

  @PrimaryColumn()
  streakId: number;

  @ManyToOne(() => Habit, (habit) => habit.streakConnection)
  @JoinColumn({ name: "habitId" })
  habit: Habit;

  @ManyToOne(() => Streak, (streak) => streak.habitConnection)
  @JoinColumn({ name: "streakId" })
  streak: Streak;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
