import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Habit extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id!: number;

  @Field()
  @Column()
  name!:string

  @Field()
  @Column()
  gorb!:boolean

  @Field()
  @Column()
  motivation:string

  @Field()
  @Column()
  goal!:number

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @PrimaryColumn()
  userId: number

  @ManyToOne(()=>User, user => user.habits)
  @JoinColumn({name:'userId'})
  user!: User
}
