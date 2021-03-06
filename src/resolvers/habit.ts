import { Habit } from "../entities/Habit";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  ObjectType,
  Ctx,
} from "type-graphql";
import { MyContext } from "../types";

@ObjectType()
class HabitError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class HabitResponse {
  @Field(() => [HabitError], { nullable: true })
  errors?: HabitError[];

  @Field(() => Habit, { nullable: true })
  habit?: Habit;
}

@InputType()
class HabitInput {
  @Field()
  name!: string;

  @Field()
  motivation: string;

  @Field()
  goal!: number;

  @Field()
  gorb!: boolean;
}

@Resolver()
export class HabitResolver {
  @Query(() => [Habit])
  async habits(): Promise<Habit[]> {
    return await Habit.find();
  }

  @Mutation(() => HabitResponse)
  async createHabit(
    @Arg("input") input: HabitInput,
    @Ctx() { req }: MyContext
  ): Promise<HabitResponse> {
    let habit;
    if (!input.name) {
      return {
        errors: [
          {
            field: "habitName",
            message: "You must include a name to track a habit",
          },
        ],
      };
    }
    if (!input.goal) {
      return {
        errors: [
          {
            field: "goalAmount",
            message: "You must include an amount of time to track progress",
          },
        ],
      };
    }
    try {
      const result = await Habit.create({
        ...input,
        userId: req.session.userId,
      }).save();
      habit = result;
    } catch (err) {
      if (err) {
        return {
          errors: [
            {
              field: "habit",
              message: "An error ocurred, try again",
            },
          ],
        };
      }
    }
    return { habit };
  }

  @Mutation(() => HabitResponse)
  async updateHabit(
    @Arg("input") input: HabitInput,
    @Arg("id") id: number
  ): Promise<HabitResponse> {
    let habit = Habit.findOne({ id });
    if (!habit) {
      return {
        errors: [
          {
            field: "habit",
            message: "Could not find the habit requested",
          },
        ],
      };
    }
    if (input.name && input.goal) {
      try {
        Habit.update({ id }, { ...input });
      } catch (err) {
        if (err) {
          return {
            errors: [
              {
                field: "habit",
                message: "An error occured, try again",
              },
            ],
          };
        }
      }
    }
    return { habit: await Habit.findOne({ id }) };
  }

  @Mutation(() => Boolean)
  async deleteHabit(@Arg("id") id: number): Promise<Boolean> {
    await Habit.delete(id);
    return true;
  }
}
