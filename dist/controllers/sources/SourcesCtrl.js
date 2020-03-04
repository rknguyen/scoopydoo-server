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
const source_1 = require("../../models/source");
const SourcesCtrl_Erro_1 = __importDefault(require("./SourcesCtrl.Erro"));
let SourcesCtrl = class SourcesCtrl {
    /**
     * Get all sources
     */
    getAllSources() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield source_1.Sources.getAllSources()
                .then(sources => ({ data: sources }))
                .catch(error => ({ error }));
        });
    }
};
__decorate([
    common_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SourcesCtrl.prototype, "getAllSources", null);
SourcesCtrl = __decorate([
    common_1.Controller('/sources'),
    common_1.UseAuth(Guards_1.AuthCheck),
    common_1.MergeParams(true)
], SourcesCtrl);
exports.SourcesCtrl = SourcesCtrl;
let SourceCtrl = class SourceCtrl {
    /**
     * Get source infomation by source id
     * @param id :id of source
     */
    findSourceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return source_1.Sources.findSourceById(id)
                .then((source) => !!source ? { data: source } : { error: SourcesCtrl_Erro_1.default.SOURCE_NOT_FOUND })
                .catch(error => ({ error }));
        });
    }
    /**
     * Create new source
     * @param name :name of source
     * @param color :color of source tag
     */
    createNewSource(name, color) {
        return __awaiter(this, void 0, void 0, function* () {
            return source_1.Sources.create(name, color)
                .then(source => ({ data: source }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Update name of source
     * @param id :id of source
     * @param name :new source name
     */
    updateSourceName(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return source_1.Sources.updateNameById(id, name)
                .then(() => ({ success: true }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Delete source by id
     * @param id :if of source
     */
    deleteSourceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return source_1.Sources.deleteById(id)
                .then(() => ({ sucess: true }))
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
], SourceCtrl.prototype, "findSourceById", null);
__decorate([
    common_1.Post('/new'),
    __param(0, common_1.Required()), __param(0, common_1.BodyParams('name')),
    __param(1, common_1.Required()), __param(1, common_1.BodyParams('color')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SourceCtrl.prototype, "createNewSource", null);
__decorate([
    common_1.Patch('/:id'),
    __param(0, common_1.Required()), __param(0, common_1.PathParams('id')),
    __param(1, common_1.Required()), __param(1, common_1.BodyParams('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SourceCtrl.prototype, "updateSourceName", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Required()), __param(0, common_1.PathParams('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SourceCtrl.prototype, "deleteSourceById", null);
SourceCtrl = __decorate([
    common_1.Controller('/source'),
    common_1.UseAuth(Guards_1.AuthCheck),
    common_1.MergeParams(true)
], SourceCtrl);
exports.SourceCtrl = SourceCtrl;
//# sourceMappingURL=SourcesCtrl.js.map