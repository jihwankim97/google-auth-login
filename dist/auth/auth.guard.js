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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthGuard = exports.AuthenticatedGuard = exports.LocalAuthGuard = exports.LoginGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
let LoginGuard = class LoginGuard {
    constructor(authService) {
        this.authService = authService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        console.log(request.cookies['login']);
        if (request.cookies['login']) {
            return true;
        }
        if (!request.body.email || !request.body.password) {
            return false;
        }
        const user = await this.authService.validateUser(request.body.email, request.body.password);
        if (!user) {
            return false;
        }
        request.user = user;
        return true;
    }
};
LoginGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], LoginGuard);
exports.LoginGuard = LoginGuard;
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
    async canActivate(context) {
        console.log('guard before canActivate');
        const result = (await super.canActivate(context));
        console.log('result : ' + result);
        console.log('guard after canActivate');
        const request = context.switchToHttp().getRequest();
        console.log(request.session);
        await super.logIn(request);
        console.log(request.session);
        return result;
    }
};
LocalAuthGuard = __decorate([
    (0, common_1.Injectable)()
], LocalAuthGuard);
exports.LocalAuthGuard = LocalAuthGuard;
let AuthenticatedGuard = class AuthenticatedGuard {
    canActivate(context) {
        console.log('333');
        const request = context.switchToHttp().getRequest();
        return request.isAuthenticated();
    }
};
AuthenticatedGuard = __decorate([
    (0, common_1.Injectable)()
], AuthenticatedGuard);
exports.AuthenticatedGuard = AuthenticatedGuard;
let GoogleAuthGuard = class GoogleAuthGuard extends (0, passport_1.AuthGuard)('google') {
    async canActivate(context) {
        const result = (await super.canActivate(context));
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }
};
GoogleAuthGuard = __decorate([
    (0, common_1.Injectable)()
], GoogleAuthGuard);
exports.GoogleAuthGuard = GoogleAuthGuard;
//# sourceMappingURL=auth.guard.js.map