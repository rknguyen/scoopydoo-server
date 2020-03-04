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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@tsed/common");
const user_1 = require("../../models/user");
const UsersCtrl_Erro_1 = __importDefault(require("./UsersCtrl.Erro"));
const Guards_1 = require("../../middlewares/Guards");
let UsersCtrl = class UsersCtrl {
    /**
     * Get all users
     */
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.Users.getAllUsers()
                .then(users => ({ data: users }))
                .catch(error => ({ error }));
        });
    }
};
__decorate([
    common_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersCtrl.prototype, "getUsers", null);
UsersCtrl = __decorate([
    common_1.Controller('/users'),
    common_1.UseAuth(Guards_1.AuthCheck),
    common_1.MergeParams(true)
], UsersCtrl);
exports.UsersCtrl = UsersCtrl;
let UserCtrl = class UserCtrl {
    /**
     * Find user by user id
     * @param request :request from user
     * @param id :user id
     */
    findUserById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.Users.findUserById(req.user._id)
                .then((user) => (!!user ? { data: user } : { error: UsersCtrl_Erro_1.default.USER_NOT_FOUND }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Create new account
     * @param username
     * @param password
     * @param fullName
     */
    createNewUser(username, password, fullName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.Users.findUserByUsername(username)
                .then((user) => !!user ? { error: UsersCtrl_Erro_1.default.DUPLICATED_USERNAME } : user_1.Users.create(username, password, fullName))
                .catch(error => ({ error }));
        });
    }
    /**
     * Update my password
     * @param password :new password
     */
    updateUserPasswordById(request, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.Users.updatePasswordById(request.user.id, password)
                .then(() => ({ success: true }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Delete my account
     */
    deleteUserById(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.Users.deleteById(request.user.id)
                .then(() => ({ success: true }))
                .catch(error => ({ error }));
        });
    }
};
__decorate([
    common_1.Get('/me'),
    common_1.UseAuth(Guards_1.AuthCheck),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserCtrl.prototype, "findUserById", null);
__decorate([
    common_1.Post('/new'),
    common_1.UseAuth(Guards_1.AuthCheck),
    __param(0, common_1.Required()), __param(0, common_1.BodyParams('username')),
    __param(1, common_1.Required()), __param(1, common_1.BodyParams('password')),
    __param(2, common_1.Required()), __param(2, common_1.BodyParams('fullName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserCtrl.prototype, "createNewUser", null);
__decorate([
    common_1.Patch('/me/password'),
    common_1.UseAuth(Guards_1.AuthCheck),
    __param(0, common_1.Req()), __param(1, common_1.Required()), __param(1, common_1.BodyParams('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserCtrl.prototype, "updateUserPasswordById", null);
__decorate([
    common_1.Delete('/me'),
    common_1.UseAuth(Guards_1.AuthCheck),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserCtrl.prototype, "deleteUserById", null);
UserCtrl = __decorate([
    common_1.Controller('/user'),
    common_1.MergeParams(true)
], UserCtrl);
exports.UserCtrl = UserCtrl;
//# sourceMappingURL=UsersCtrl.js.map