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
exports.StreakResolver = void 0;
const Streak_1 = require("../entities/Streak");
const Habit_1 = require("../entities/Habit");
const HabitStreak_1 = require("../entities/HabitStreak");
const type_graphql_1 = require("type-graphql");
let StreakResolver = class StreakResolver {
    myStreaks({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            return Streak_1.Streak.findOne({ userId: req.session.userId });
        });
    }
    createStreak(habitId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            let streak = yield Streak_1.Streak.create({
                userId: req.session.userId,
            });
            let habit = yield Habit_1.Habit.findOne({ id: habitId });
            streak.save();
            yield HabitStreak_1.HabitStreak.create({ habit, streak }).save();
            return streak;
        });
    }
    updateStreakValues(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let streak = yield Streak_1.Streak.findOne({ id });
            let sMax = streak === null || streak === void 0 ? void 0 : streak.highestStreak;
            if (streak) {
                let sCurrent = streak.currentStreak + 1;
                if (streak.highestStreak < streak.currentStreak) {
                    sMax = streak.currentStreak;
                }
                Streak_1.Streak.update({ id }, { highestStreak: sMax, currentStreak: sCurrent });
            }
            return yield Streak_1.Streak.findOne({ id });
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Streak_1.Streak], { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StreakResolver.prototype, "myStreaks", null);
__decorate([
    type_graphql_1.Mutation(() => Streak_1.Streak),
    __param(0, type_graphql_1.Arg("habitId")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], StreakResolver.prototype, "createStreak", null);
__decorate([
    type_graphql_1.Mutation(() => Streak_1.Streak),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StreakResolver.prototype, "updateStreakValues", null);
StreakResolver = __decorate([
    type_graphql_1.Resolver()
], StreakResolver);
exports.StreakResolver = StreakResolver;
//# sourceMappingURL=streak.js.map