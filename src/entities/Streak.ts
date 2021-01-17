import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { HabitStreak } from "./HabitStreak";
import { User } from "./User";

@ObjectType()
@Entity()
export class Streak extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  highestStreak: number;

  @Field()
  @Column()
  currentStreak: number;

  @OneToMany(() => HabitStreak, (hs) => hs.streak)
  habitConnection: HabitStreak;

  @ManyToOne(() => User, (user) => user.streaks)
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
