import { Controller, Post, UseGuards, Req, Get, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(private service: AttendanceService) {}

  @Post('check-in')
  checkIn(@Req() req) {
    return this.service.checkIn(req.user.sub);
  }

  @Post('check-out')
  checkOut(@Req() req) {
    return this.service.checkOut(req.user.sub);
  }

  @Get('summary')
  async summary(
    @Req() req,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    const data = await this.service.getSummary(
      req.user.sub,
      from,
      to,
    );

    return {
      message: 'Summary absen',
      data,
    };
  }

  // HRD: lihat semua absensi karyawan
  @Get('all')
  @Roles('HRD')
  @UseGuards(RolesGuard)
  async getAll(
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    const data = await this.service.getAllSummary(from, to);
    return {
      message: 'Semua absensi karyawan',
      data,
    };
  }

}

