import { AttendanceService } from './attendance.service';
export declare class AttendanceController {
    private service;
    constructor(service: AttendanceService);
    checkIn(req: any): Promise<import("./attendance.entity").Attendance>;
    checkOut(req: any): Promise<import("./attendance.entity").Attendance>;
    summary(req: any, from: string, to: string): Promise<{
        message: string;
        data: import("./attendance.entity").Attendance[];
    }>;
    getAll(from: string, to: string): Promise<{
        message: string;
        data: import("./attendance.entity").Attendance[];
    }>;
}
