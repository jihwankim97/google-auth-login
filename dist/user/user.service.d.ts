import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(user: any): Promise<User>;
    getUser(email: string): Promise<User>;
    updateUser(email: any, _user: any): Promise<void>;
    deleteUser(email: any): Promise<import("typeorm").DeleteResult>;
    findByEmailOrSave(email: any, username: any, providerId: any): Promise<User>;
}
