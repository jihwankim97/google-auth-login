import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private userSerivice;
    constructor(userSerivice: UserService);
    register(userDto: CreateUserDto): Promise<import("../user/user.entity").User>;
    validateUser(email: string, password: string): Promise<{
        id?: number;
        email: string;
        username: string;
        createdDt: Date;
        providerId: string;
    }>;
}
