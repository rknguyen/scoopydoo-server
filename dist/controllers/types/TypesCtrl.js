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
const Guards_1 = require("../../middlewares/Guards");
const type_1 = require("../../models/type");
const TypesCtrl_Erro_1 = __importDefault(require("./TypesCtrl.Erro"));
let TypesCtrl = class TypesCtrl {
    /**
     * Get all types
     */
    getAllTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield type_1.Types.getAllTypes()
                .then(types => ({ data: types }))
                .catch(error => ({ error }));
        });
    }
};
__decorate([
    common_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TypesCtrl.prototype, "getAllTypes", null);
TypesCtrl = __decorate([
    common_1.Controller('/types'),
    common_1.UseAuth(Guards_1.AuthCheck),
    common_1.MergeParams(true)
], TypesCtrl);
exports.TypesCtrl = TypesCtrl;
let TypeCtrl = class TypeCtrl {
    /**
     * Get type information by id
     * @param id :id of type
     */
    findTypeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield type_1.Types.findTypeById(id)
                .then((type) => (!!type ? { data: type } : { error: TypesCtrl_Erro_1.default.TYPE_NOT_FOUND }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Create new type
     * @param name :name of type
     * @param color :color of type
     */
    createNewType(name, color) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield type_1.Types.create(name, color)
                .then(type => ({ data: type }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Update name of type
     * @param id :id of type
     * @param name :new name of type
     */
    updateTypeName(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield type_1.Types.updateNameById(id, name)
                .then(() => ({ success: true }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Delete type by id
     * @param id :id of type
     */
    deleteTypeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield type_1.Types.deleteById(id)
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
], TypeCtrl.prototype, "findTypeById", null);
__decorate([
    common_1.Post('/new'),
    __param(0, common_1.Required()), __param(0, common_1.BodyParams('name')),
    __param(1, common_1.Required()), __param(1, common_1.BodyParams('color')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TypeCtrl.prototype, "createNewType", null);
__decorate([
    common_1.Patch('/:id'),
    __param(0, common_1.Required()), __param(0, common_1.PathParams('id')),
    __param(1, common_1.Required()), __param(1, common_1.BodyParams('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TypeCtrl.prototype, "updateTypeName", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Required()), __param(0, common_1.PathParams('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeCtrl.prototype, "deleteTypeById", null);
TypeCtrl = __decorate([
    common_1.Controller('/type'),
    common_1.UseAuth(Guards_1.AuthCheck),
    common_1.MergeParams(true)
], TypeCtrl);
exports.TypeCtrl = TypeCtrl;
//# sourceMappingURL=TypesCtrl.js.map