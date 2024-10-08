import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(userDto: CreateUserDto): Promise<import("../user/user.entity").User>;
    login(req: any, res: any): Promise<any>;
    login2(req: any, res: any): Promise<any>;
    testGuard(): string;
    login3(req: any): any;
    testGuardWithSession(req: any): any;
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any, res: any): Promise<any>;
}
