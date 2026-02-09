import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/users.service';
export declare class AuthService {
    private jwtService;
    private usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    login(email: string, password: string): Promise<{
        message: string;
        error: string;
        statusCode: number;
        message_db: string;
        totalUsers: number;
        token?: undefined;
        role?: undefined;
        user?: undefined;
    } | {
        message: string;
        token: string;
        role: import("../user/user.entity").UserRole;
        statusCode: number;
        user: {
            id: number;
            name: string;
            email: string;
        };
        message_db: string;
        totalUsers: number;
        error?: undefined;
    }>;
}
