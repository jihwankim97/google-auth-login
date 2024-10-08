"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userSerivice) {
        this.userSerivice = userSerivice;
    }
    async register(userDto) {
        const user = await this.userSerivice.getUser(userDto.email);
        if (user) {
            throw new common_1.HttpException('해당 유저가 이미 있습니다.', common_1.HttpStatus.BAD_REQUEST);
        }
        const encryptedPassword = bcrypt.hashSync(userDto.password, 10);
        try {
            const user = await this.userSerivice.createUser(Object.assign(Object.assign({}, userDto), { password: encryptedPassword }));
            user.password = undefined;
            return user;
        }
        catch (error) {
            throw new common_1.HttpException('서버에러', 500);
        }
    }
    async validateUser(email, password) {
        const user = await this.userSerivice.getUser(email);
        if (!user) {
            return null;
        }
        const { password: hashedPassword } = user, userInfo = __rest(user, ["password"]);
        if (bcrypt.compareSync(password, hashedPassword)) {
            return userInfo;
        }
        return null;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map