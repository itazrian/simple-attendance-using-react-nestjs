import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Attendance } from './attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private repo: Repository<Attendance>,
  ) {}

  private today() {
    return new Date().toISOString().split('T')[0];
  }

  private nowTime() {
    return new Date().toTimeString().slice(0, 8);
  }

    async checkIn(userId: number) {
  const date = this.today();

  const existing = await this.repo.findOne({
    where: { userId, date }, 
  });

  if (existing?.check_in) {
    throw new BadRequestException('Sudah absen masuk hari ini');
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

    async checkOut(userId: number) {
  const date = this.today();

  const attendance = await this.repo.findOne({
    where: { userId, date }, 
  });

  if (!attendance || !attendance.check_in) {
    throw new BadRequestException('Belum absen masuk');
  }

  if (attendance.check_out) {
    throw new BadRequestException('Sudah absen pulang');
  }

  attendance.check_out = this.nowTime();
  return this.repo.save(attendance);
    }

    async getSummary(
        userId: number,
        from: string,
        to: string,
        ) {
        return this.repo.find({
            where: {
            userId,
            date: Between(from, to),
            },
            order: {
            date: 'ASC',
            },
        });
    }

    async getAllSummary(from?: string, to?: string) {
      const options: any = { order: { date: 'DESC' } };

      if (from && to) {
        options.where = { date: Between(from, to) };
      }

      return this.repo.find(options);
    }

    
    async _getAllSummary_V1(from?: string, to?: string) {
      const query = this.repo.createQueryBuilder('a');

      if (from && to) {
        query.where('a.checkIn BETWEEN :from AND :to', { from, to });
      }

      return query.getMany();
    }


}
