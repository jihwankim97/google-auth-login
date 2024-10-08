import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(user: CreateUserDto): Promise<import("./user.entity").User>;
    getUser(email: string): Promise<import("./user.entity").User>;
    updateUser(email: string, user: CreateUserDto): Promise<void>;
    deleteUser(email: string): Promise<import("typeorm").DeleteResult>;
}
