import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
export declare class AttendanceService {
    private repo;
    constructor(repo: Repository<Attendance>);
    private today;
    private nowTime;
    checkIn(userId: number): Promise<Attendance>;
    checkOut(userId: number): Promise<Attendance>;
    getSummary(userId: number, from: string, to: string): Promise<Attendance[]>;
    getAllSummary(from?: string, to?: string): Promise<Attendance[]>;
    _getAllSummary_V1(from?: string, to?: string): Promise<Attendance[]>;
}
