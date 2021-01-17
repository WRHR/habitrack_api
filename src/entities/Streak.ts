import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { HabitStreak } from "./HabitStreak";

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

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
