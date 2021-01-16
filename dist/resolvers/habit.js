"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitResolver = void 0;
const Habit_1 = require("../entities/Habit");
const type_graphql_1 = require("type-graphql");
let HabitError = class HabitError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], HabitError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], HabitError.prototype, "message", void 0);
HabitError = __decorate([
    type_graphql_1.ObjectType()
], HabitError);
let HabitResponse = class HabitResponse {
};
__decorate([
    type_graphql_1.Field(() => [HabitError], { nullable: true }),
    __metadata("design:type", Array)
], HabitResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => Habit_1.Habit, { nullable: true }),
    __metadata("design:type", Habit_1.Habit)
], HabitResponse.prototype, "habit", void 0);
HabitResponse = __decorate([
    type_graphql_1.ObjectType()
], HabitResponse);
let HabitInput = class HabitInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], HabitInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], HabitInput.prototype, "motivation", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], HabitInput.prototype, "goal", void 0);
HabitInput = __decorate([
    type_graphql_1.InputType()
], HabitInput);
let HabitResolver = class HabitResolver {
    habits() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Habit_1.Habit.find();
        });
    }
    createHabit(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const result = yield Habit_1.Habit.create(Object.assign(Object.assign({}, input), { userId: req.session.userId })).save();
                habit = result;
            }
            catch (err) {
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
        });
    }
    updateHabit(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let habit = Habit_1.Habit.findOne({ id });
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
                    Habit_1.Habit.update({ id }, Object.assign({}, input));
                }
                catch (err) {
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
            return { habit: yield Habit_1.Habit.findOne({ id }) };
        });
    }
    deleteHabit(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Habit_1.Habit.delete(id);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Habit_1.Habit]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HabitResolver.prototype, "habits", null);
__decorate([
    type_graphql_1.Mutation(() => HabitResponse),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HabitInput, Object]),
    __metadata("design:returntype", Promise)
], HabitResolver.prototype, "createHabit", null);
__decorate([
    type_graphql_1.Mutation(() => HabitResponse),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HabitInput, Number]),
    __metadata("design:returntype", Promise)
], HabitResolver.prototype, "updateHabit", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HabitResolver.prototype, "deleteHabit", null);
HabitResolver = __decorate([
    type_graphql_1.Resolver()
], HabitResolver);
exports.HabitResolver = HabitResolver;
//# sourceMappingURL=habit.js.map