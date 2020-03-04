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
const CandidatesCtrl_Erro_1 = __importDefault(require("./CandidatesCtrl.Erro"));
const CandidatesCtrl_Act_1 = __importDefault(require("./CandidatesCtrl.Act"));
const common_1 = require("@tsed/common");
const Guards_1 = require("../../middlewares/Guards");
const candidates_1 = require("../../models/candidates");
const history_1 = require("../../models/history");
const process_1 = require("../../models/process");
const status_1 = require("../../models/status");
const role_1 = require("../../models/role");
const type_1 = require("../../models/type");
const source_1 = require("../../models/source");
const user_1 = require("../../models/user");
/**
 * TODO: Need actions history for each action affects on candidate
 */
function toDetailAction(act) {
    return __awaiter(this, void 0, void 0, function* () {
        let action = Object.assign({}, act.toObject());
        action.actor = yield user_1.Users.findUserById(action.actorId);
        return action;
    });
}
function toDetailCandidate(cand) {
    return __awaiter(this, void 0, void 0, function* () {
        let candidate = Object.assign({}, cand.toObject());
        if (!!candidate.processId)
            candidate.process = yield process_1.Processes.findProcessById(candidate.processId);
        if (!!candidate.statusId)
            candidate.status = yield status_1.Statuses.findStatusById(candidate.statusId);
        if (!!candidate.roleId)
            candidate.role = yield role_1.Roles.findRoleById(candidate.roleId);
        if (!!candidate.typeId)
            candidate.type = yield type_1.Types.findTypeById(candidate.typeId);
        if (!!candidate.sourceId)
            candidate.source = yield source_1.Sources.findSourceById(candidate.sourceId);
        /**
         *
         */
        candidate.history = yield history_1.Histories.findHistoryByCandidateId(candidate._id);
        candidate.history = yield Promise.all(candidate.history.map(toDetailAction));
        return candidate;
    });
}
let CandidatesCtrl = class CandidatesCtrl {
    /**
     * Get all candidates
     */
    getAllCandidates() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield candidates_1.Candidates.getAllCandidates()
                .then(candidates => Promise.all(candidates.map(toDetailCandidate)))
                .then(candidates => ({ data: candidates }))
                .catch(error => ({ error }));
        });
    }
};
__decorate([
    common_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CandidatesCtrl.prototype, "getAllCandidates", null);
CandidatesCtrl = __decorate([
    common_1.Controller('/candidates'),
    common_1.UseAuth(Guards_1.AuthCheck),
    common_1.MergeParams(true)
], CandidatesCtrl);
exports.CandidatesCtrl = CandidatesCtrl;
let CandidateCtrl = class CandidateCtrl {
    /**
     * Find candidate by Id
     * @param id :id of candidate
     */
    findCandidateById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield candidates_1.Candidates.findCandidateById(id)
                .then((candidate) => (!!candidate ? toDetailCandidate(candidate) : candidate))
                .then((candidate) => !!candidate ? { data: candidate } : { error: CandidatesCtrl_Erro_1.default.CANDIDATE_NOT_FOUND })
                .catch(error => ({ error }));
        });
    }
    /**
     * Create new candidate
     * @param name :name of candidate
     * @param email :email of candidate
     */
    createNewCandidate(name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield candidates_1.Candidates.create(name, email)
                .then(candidate => ({ data: candidate }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Update new candidate name
     * @param id :id of candidate
     * @param name :new name of candidate
     */
    updateCandidateName(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield candidates_1.Candidates.updateNameById(id, name)
                .then(() => ({ success: true }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Update new candidate email
     * @param id :id of candidate
     * @param email :new email of candidate
     */
    updateCandidateEmail(id, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield candidates_1.Candidates.updateEmailById(id, email)
                .then(() => ({ success: true }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Update new candidate process
     * @param id :id of candidate
     * @param processId :id of process
     */
    updateCandidateProcess(request, id, processId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield candidates_1.Candidates.updateProcessById(id, processId)
                .then(() => history_1.Histories.create(id, CandidatesCtrl_Act_1.default.UPDATE_PROCESS, request.user._id, comment))
                .then(() => ({ success: true }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Update new candidate process
     * @param id :id of candidate
     * @param processId :id of process
     */
    updateCandidateStatus(request, id, statusId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield candidates_1.Candidates.updateStatusById(id, statusId)
                .then(() => history_1.Histories.create(id, CandidatesCtrl_Act_1.default.UPDATE_STATUS, request.user._id, comment))
                .then(() => ({ success: true }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Update new candidate role
     * @param id :id of candidate
     * @param roleId :id of role
     */
    updateCandidateRole(request, id, roleId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield candidates_1.Candidates.updateRoleById(id, roleId)
                .then(() => history_1.Histories.create(id, CandidatesCtrl_Act_1.default.UPDATE_ROLE, request.user._id, comment))
                .then(() => ({ success: true }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Update new candidate type
     * @param id :id of candidate
     * @param typeId :id of type
     */
    updateCandidateType(request, id, typeId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield candidates_1.Candidates.updateTypeById(id, typeId)
                .then(() => history_1.Histories.create(id, CandidatesCtrl_Act_1.default.UPDATE_TYPE, request.user._id, comment))
                .then(() => ({ success: true }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Update new candidate source
     * @param id :id of candidate
     * @param sourceId :id of source
     */
    updateCandidateSource(request, id, sourceId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield candidates_1.Candidates.updateSourceById(id, sourceId)
                .then(() => history_1.Histories.create(id, CandidatesCtrl_Act_1.default.UPDATE_SOURCE, request.user._id, comment))
                .then(() => ({ success: true }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Update new candidate BTSId
     * @param id :id of candidate
     * @param BTSId :id of BTS
     */
    updateBTSSource(request, id, BTSId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield candidates_1.Candidates.updateBTSIdById(id, BTSId)
                .then(() => history_1.Histories.create(id, CandidatesCtrl_Act_1.default.UPDATE_BTSID, request.user._id, comment))
                .then(() => ({ success: true }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Update new candidate schedule
     * @param id :id of candidate
     * @param scheduledTime :new schedule
     */
    updateCandidateSchedule(request, id, scheduledTime, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield candidates_1.Candidates.updatescheduledTimeById(id, scheduledTime)
                .then(() => history_1.Histories.create(id, CandidatesCtrl_Act_1.default.UPDATE_SCHEDULE, request.user._id, comment))
                .then(() => ({ success: true }))
                .catch(error => ({ error }));
        });
    }
    /**
     * Delete candidate by id
     * @param id :id of candidate
     */
    deleteCandidateById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield candidates_1.Candidates.deleteById(id)
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
], CandidateCtrl.prototype, "findCandidateById", null);
__decorate([
    common_1.Post('/new'),
    __param(0, common_1.Required()), __param(0, common_1.BodyParams('name')),
    __param(1, common_1.Required()), __param(1, common_1.BodyParams('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CandidateCtrl.prototype, "createNewCandidate", null);
__decorate([
    common_1.Patch('/:id/name'),
    __param(0, common_1.Required()), __param(0, common_1.PathParams('id')),
    __param(1, common_1.Required()), __param(1, common_1.BodyParams('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CandidateCtrl.prototype, "updateCandidateName", null);
__decorate([
    common_1.Patch('/:id/email'),
    __param(0, common_1.Required()), __param(0, common_1.PathParams('id')),
    __param(1, common_1.Required()), __param(1, common_1.BodyParams('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CandidateCtrl.prototype, "updateCandidateEmail", null);
__decorate([
    common_1.Patch('/:id/process'),
    __param(0, common_1.Req()),
    __param(1, common_1.Required()), __param(1, common_1.PathParams('id')),
    __param(2, common_1.Required()), __param(2, common_1.BodyParams('processId')),
    __param(3, common_1.Required()), __param(3, common_1.BodyParams('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], CandidateCtrl.prototype, "updateCandidateProcess", null);
__decorate([
    common_1.Patch('/:id/status'),
    __param(0, common_1.Req()),
    __param(1, common_1.Required()), __param(1, common_1.PathParams('id')),
    __param(2, common_1.Required()), __param(2, common_1.BodyParams('statusId')),
    __param(3, common_1.Required()), __param(3, common_1.BodyParams('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], CandidateCtrl.prototype, "updateCandidateStatus", null);
__decorate([
    common_1.Patch('/:id/role'),
    __param(0, common_1.Req()),
    __param(1, common_1.Required()), __param(1, common_1.PathParams('id')),
    __param(2, common_1.Required()), __param(2, common_1.BodyParams('roleId')),
    __param(3, common_1.Required()), __param(3, common_1.BodyParams('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], CandidateCtrl.prototype, "updateCandidateRole", null);
__decorate([
    common_1.Patch('/:id/type'),
    __param(0, common_1.Req()),
    __param(1, common_1.Required()), __param(1, common_1.PathParams('id')),
    __param(2, common_1.Required()), __param(2, common_1.BodyParams('typeId')),
    __param(3, common_1.Required()), __param(3, common_1.BodyParams('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], CandidateCtrl.prototype, "updateCandidateType", null);
__decorate([
    common_1.Patch('/:id/source'),
    __param(0, common_1.Req()),
    __param(1, common_1.Required()), __param(1, common_1.PathParams('id')),
    __param(2, common_1.Required()), __param(2, common_1.BodyParams('sourceId')),
    __param(3, common_1.Required()), __param(3, common_1.BodyParams('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], CandidateCtrl.prototype, "updateCandidateSource", null);
__decorate([
    common_1.Patch('/:id/bts'),
    __param(0, common_1.Req()),
    __param(1, common_1.Required()), __param(1, common_1.PathParams('id')),
    __param(2, common_1.Required()), __param(2, common_1.BodyParams('BTSId')),
    __param(3, common_1.Required()), __param(3, common_1.BodyParams('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], CandidateCtrl.prototype, "updateBTSSource", null);
__decorate([
    common_1.Patch('/:id/schedule'),
    __param(0, common_1.Req()),
    __param(1, common_1.Required()), __param(1, common_1.PathParams('id')),
    __param(2, common_1.Required()), __param(2, common_1.BodyParams('scheduledTime')),
    __param(3, common_1.Required()), __param(3, common_1.BodyParams('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, String]),
    __metadata("design:returntype", Promise)
], CandidateCtrl.prototype, "updateCandidateSchedule", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Required()), __param(0, common_1.PathParams('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidateCtrl.prototype, "deleteCandidateById", null);
CandidateCtrl = __decorate([
    common_1.Controller('/candidate'),
    common_1.UseAuth(Guards_1.AuthCheck),
    common_1.MergeParams(true)
], CandidateCtrl);
exports.CandidateCtrl = CandidateCtrl;
//# sourceMappingURL=CandidatesCtrl.js.map