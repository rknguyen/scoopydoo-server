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
const StatusesCtrl_Erro_1 = __importDefault(require("./StatusesCtrl.Erro"));
const common_1 = require("@tsed/common");
const Guards_1 = require("../../middlewares/Guards");
const status_1 = require("../../models/status");
let StatusesCtrl = class StatusesCtrl {
    /**
     * Get all statuses
     */
    getAllStatuses() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield status_1.Statuses.getAllStatuses()
                .then(statuses => ({ data: statuses }))
                .catch(error => error);
        });
    }
};
__decorate([
    common_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatusesCtrl.prototype, "getAllStatuses", null);
StatusesCtrl = __decorate([
    common_1.Controller('/statuses'),
    common_1.UseAuth(Guards_1.AuthCheck),
    common_1.MergeParams(true)
], StatusesCtrl);
exports.StatusesCtrl = StatusesCtrl;
let StatusCtrl = class StatusCtrl {
    /**
     * Find status by Id
     * @param id :id of status
     */
    findStatusById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield status_1.Statuses.findStatusById(id)
                .then((status) => (!!status ? status : { error: StatusesCtrl_Erro_1.default.STATUS_NOT_FOUND }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Create new status
     * @param name :name of status
     * @param color :color of status
     */
    createNewStatus(name, color) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield status_1.Statuses.create(name, color)
                .then(status => ({ data: status }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Update new status name
     * @param id :id of status
     * @param name :new name of status
     */
    updateStatusName(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return status_1.Statuses.updateNameById(id, name)
                .then(() => ({ success: true }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Delete status by id
     * @param id :id of status
     */
    deleteStatusById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return status_1.Statuses.deleteById(id)
                .then(() => ({ success: true }))
                .catch(error => ({ error }));
        });
    }
};
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Required()), __param(0, common_1.PathParams('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StatusCtrl.prototype, "findStatusById", null);
__decorate([
    common_1.Post('/new'),
    __param(0, common_1.Required()), __param(0, common_1.BodyParams('name')),
    __param(1, common_1.Required()), __param(1, common_1.BodyParams('color')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StatusCtrl.prototype, "createNewStatus", null);
__decorate([
    common_1.Patch('/:id'),
    __param(0, common_1.Required()), __param(0, common_1.PathParams('id')),
    __param(1, common_1.Required()), __param(1, common_1.BodyParams('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StatusCtrl.prototype, "updateStatusName", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Required()), __param(0, common_1.PathParams('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StatusCtrl.prototype, "deleteStatusById", null);
StatusCtrl = __decorate([
    common_1.Controller('/status'),
    common_1.UseAuth(Guards_1.AuthCheck),
    common_1.MergeParams(true)
], StatusCtrl);
exports.StatusCtrl = StatusCtrl;
//# sourceMappingURL=StatusesCtrl.js.map