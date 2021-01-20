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
exports.HabitStreak = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Streak_1 = require("./Streak");
let HabitStreak = class HabitStreak extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], HabitStreak.prototype, "streakId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Streak_1.Streak, (streak) => streak.habitConnection),
    typeorm_1.JoinColumn({ name: "streakId" }),
    __metadata("design:type", Streak_1.Streak)
], HabitStreak.prototype, "streak", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], HabitStreak.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], HabitStreak.prototype, "updatedAt", void 0);
HabitStreak = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], HabitStreak);
exports.HabitStreak = HabitStreak;
//# sourceMappingURL=HabitStreak.js.map