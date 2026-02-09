import { AuthService } from './auth.service';
import { UsersService } from '../user/users.service';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
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
    getProfile(req: any): Promise<{
        message: string;
        profile: {
            name: string;
            email: string;
            position: string;
            phone: string;
            photo: string;
        };
    }>;
    updateProfile(req: any, body: any): Promise<{
        message: string;
        profile: {
            name: string;
            email: string;
            position: string;
            phone: string;
            photo: string;
        };
    }>;
}
