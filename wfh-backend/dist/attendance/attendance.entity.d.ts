import { User } from '../user/user.entity';
export declare class Attendance {
    id: number;
    userId: number;
    user: User;
    date: string;
    check_in: string;
    check_out: string;
    created_at: Date;
    updated_at: Date;
}
