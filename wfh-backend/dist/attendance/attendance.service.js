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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendance_entity_1 = require("./attendance.entity");
let AttendanceService = class AttendanceService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    today() {
        return new Date().toISOString().split('T')[0];
    }
    nowTime() {
        return new Date().toTimeString().slice(0, 8);
    }
    async checkIn(userId) {
        const date = this.today();
        const existing = await this.repo.findOne({
            where: { userId, date },
        });
        if (existing?.check_in) {
            throw new common_1.BadRequestException('Sudah absen masuk hari ini');
        }
        if (existing) {
            existing.check_in = this.nowTime();
            return this.repo.save(existing);
        }
        return this.repo.save({
            userId,
            date,
            check_in: this.nowTime(),
        });
    }
    async checkOut(userId) {
        const date = this.today();
        const attendance = await this.repo.findOne({
            where: { userId, date },
        });
        if (!attendance || !attendance.check_in) {
            throw new common_1.BadRequestException('Belum absen masuk');
        }
        if (attendance.check_out) {
            throw new common_1.BadRequestException('Sudah absen pulang');
        }
        attendance.check_out = this.nowTime();
        return this.repo.save(attendance);
    }
    async getSummary(userId, from, to) {
        return this.repo.find({
            where: {
                userId,
                date: (0, typeorm_2.Between)(from, to),
            },
            order: {
                date: 'ASC',
            },
        });
    }
    async getAllSummary(from, to) {
        const options = { order: { date: 'DESC' } };
        if (from && to) {
            options.where = { date: (0, typeorm_2.Between)(from, to) };
        }
        return this.repo.find(options);
    }
    async _getAllSummary_V1(from, to) {
        const query = this.repo.createQueryBuilder('a');
        if (from && to) {
            query.where('a.checkIn BETWEEN :from AND :to', { from, to });
        }
        return query.getMany();
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map