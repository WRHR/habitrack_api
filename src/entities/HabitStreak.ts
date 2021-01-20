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
import { Streak } from "./Streak";

@ObjectType()
@Entity()
export class HabitStreak extends BaseEntity{

  @PrimaryColumn()
  streakId: number;

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
