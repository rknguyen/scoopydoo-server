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
const ProcessesCtrl_Erro_1 = __importDefault(require("./ProcessesCtrl.Erro"));
const common_1 = require("@tsed/common");
const Guards_1 = require("../../middlewares/Guards");
const process_1 = require("../../models/process");
let ProcessesCtrl = class ProcessesCtrl {
    /**
     * Get all processes
     */
    getAllProcesses() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield process_1.Processes.getAllProcesses()
                .then(processes => ({ data: processes }))
                .catch(error => ({ error }));
        });
    }
};
__decorate([
    common_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProcessesCtrl.prototype, "getAllProcesses", null);
ProcessesCtrl = __decorate([
    common_1.Controller('/processes'),
    common_1.UseAuth(Guards_1.AuthCheck),
    common_1.MergeParams(true)
], ProcessesCtrl);
exports.ProcessesCtrl = ProcessesCtrl;
let ProcessCtrl = class ProcessCtrl {
    /**
     * Find process by id
     * @param id :id of process
     */
    findProcessById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield process_1.Processes.findProcessById(id)
                .then((process) => (!!process ? process : { error: ProcessesCtrl_Erro_1.default.PROCESS_NOT_FOUND }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Create new process
     * @param name :name of process
     * @param color :color of process
     */
    createNewProcess(name, color) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield process_1.Processes.create(name, color)
                .then(process => ({ data: process }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Update name of process
     * @param id :id of process
     * @param name :name of process
     */
    updateProcessName(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield process_1.Processes.updateNameById(id, name)
                .then(() => ({ success: true }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Delete process by id
     * @param id :id of process
     */
    deleteProcessByid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield process_1.Processes.deleteById(id)
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
], ProcessCtrl.prototype, "findProcessById", null);
__decorate([
    common_1.Post('/new'),
    __param(0, common_1.Required()), __param(0, common_1.BodyParams('name')),
    __param(1, common_1.Required()), __param(1, common_1.BodyParams('color')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProcessCtrl.prototype, "createNewProcess", null);
__decorate([
    common_1.Patch('/:id'),
    __param(0, common_1.Required()), __param(0, common_1.PathParams('id')),
    __param(1, common_1.Required()), __param(1, common_1.BodyParams('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProcessCtrl.prototype, "updateProcessName", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Required()), __param(0, common_1.PathParams('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProcessCtrl.prototype, "deleteProcessByid", null);
ProcessCtrl = __decorate([
    common_1.Controller('/process'),
    common_1.UseAuth(Guards_1.AuthCheck),
    common_1.MergeParams(true)
], ProcessCtrl);
exports.ProcessCtrl = ProcessCtrl;
//# sourceMappingURL=ProcessesCtrl.js.map