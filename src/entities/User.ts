import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Habit } from "./Habit";
import { Streak } from "./Streak";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @OneToMany(() => Habit, (habit) => habit.user, { cascade: true })
  habits: Habit[];

  @OneToMany(() => Streak, (streak) => streak.user)
  streaks: Streak[];
}
