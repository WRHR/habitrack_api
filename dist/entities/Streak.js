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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Streak = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Habit_1 = require("./Habit");
const HabitStreak_1 = require("./HabitStreak");
const User_1 = require("./User");
let Streak = class Streak extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Streak.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Streak.prototype, "highestStreak", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Streak.prototype, "currentStreak", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Streak.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Streak.prototype, "habitId", void 0);
__decorate([
    typeorm_1.OneToOne(() => Habit_1.Habit, (habit) => habit.streak),
    __metadata("design:type", Habit_1.Habit)
], Streak.prototype, "habit", void 0);
__decorate([
    typeorm_1.OneToMany(() => HabitStreak_1.HabitStreak, (hs) => hs.streak),
    __metadata("design:type", HabitStreak_1.HabitStreak)
], Streak.prototype, "habitConnection", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.streaks),
    typeorm_1.JoinColumn({ name: "userId" }),
    __metadata("design:type", User_1.User)
], Streak.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Streak.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Streak.prototype, "updatedAt", void 0);
Streak = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Streak);
exports.Streak = Streak;
//# sourceMappingURL=Streak.js.map