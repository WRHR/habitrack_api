import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { HabitStreak } from "./HabitStreak";
import { User } from "./User";

@ObjectType()
@Entity()
export class Habit extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @OneToMany(() => HabitStreak, (hs) => hs.habit)
  streakConnection: HabitStreak;

  @Field()
  @Column()
  gorb!: boolean;

  @Field()
  @Column()
  motivation: string;

  @Field()
  @Column()
  goal!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.habits)
  @JoinColumn({ name: "userId" })
  user!: User;
}
