import { Profile, Strategy } from 'passport-google-oauth20';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(accessToken: string, refreshToken: string, profile: Profile): Promise<User>;
}
export {};
