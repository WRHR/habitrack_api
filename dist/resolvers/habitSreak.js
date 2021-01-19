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
exports.HabitStreakResolver = void 0;
const Streak_1 = require("../entities/Streak");
const type_graphql_1 = require("type-graphql");
const HabitStreak_1 = require("../entities/HabitStreak");
let HabitStreakResolver = class HabitStreakResolver {
    addToStreak(habitId, streakId) {
        return __awaiter(this, void 0, void 0, function* () {
            let hs = yield HabitStreak_1.HabitStreak.create({ habitId, streakId });
            hs.save();
            let streak = yield Streak_1.Streak.findOne({ id: streakId });
            let sMax = streak === null || streak === void 0 ? void 0 : streak.highestStreak;
            if (streak) {
                let sCurrent = streak.currentStreak + 1;
                if (streak.highestStreak < streak.currentStreak) {
                    sMax = streak.currentStreak;
                }
                Streak_1.Streak.update({ id: streakId }, { highestStreak: sMax, currentStreak: sCurrent });
            }
            return hs;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => HabitStreak_1.HabitStreak),
    __param(0, type_graphql_1.Arg("habitId")),
    __param(1, type_graphql_1.Arg("streakId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], HabitStreakResolver.prototype, "addToStreak", null);
HabitStreakResolver = __decorate([
    type_graphql_1.Resolver()
], HabitStreakResolver);
exports.HabitStreakResolver = HabitStreakResolver;
//# sourceMappingURL=habitSreak.js.map