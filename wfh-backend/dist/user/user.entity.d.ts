export declare enum UserRole {
    HRD = "HRD",
    EMPLOYEE = "EMPLOYEE"
}
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    position: string;
    phone: string;
    photo: string;
    role: UserRole;
    created_at: Date;
    updated_at: Date;
}
