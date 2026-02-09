import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./user.entity").User[]>;
    create(dto: CreateUserDto): Promise<import("./user.entity").User>;
    update(id: number, dto: UpdateUserDto): Promise<import("./user.entity").User | null>;
}
