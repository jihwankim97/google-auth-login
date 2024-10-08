import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
export declare class SessionSerializer extends PassportSerializer {
    private userSerivice;
    constructor(userSerivice: UserService);
    serializeUser(user: any, done: (err: Error, user: any) => void): any;
    deserializeUser(payload: any, done: (err: Error, payload: any) => void): Promise<any>;
}
