import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Habit } from "./Habit";
import { HabitStreak } from "./HabitStreak";
import { User } from "./User";

@ObjectType()
@Entity()
export class Streak extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ default: 0 })
  highestStreak: number;

  @Field()
  @Column({ default: 0 })
  currentStreak: number;

  @Field()
  @PrimaryColumn()
  userId: number;

  @Field()
  @PrimaryColumn()
  habitId!: number;

  @OneToOne(() => Habit, (habit) => habit.streak)
  habit: Habit;

  @OneToMany(() => HabitStreak, (hs) => hs.streak)
  habitConnection: HabitStreak;

  @ManyToOne(() => User, (user) => user.streaks)
  @JoinColumn({ name: "userId" })
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
