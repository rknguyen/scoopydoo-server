"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    processId: {
        type: String,
        required: false
    },
    statusId: {
        type: String,
        required: false
    },
    roleId: {
        type: String,
        required: false
    },
    typeId: {
        type: String,
        required: false
    },
    sourceId: {
        type: String,
        required: false
    },
    BTSId: {
        type: String,
        required: false
    },
    scheduledTime: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Number,
        required: false
    },
    modifiedAt: {
        type: Number,
        required: false
    }
});
CandidateSchema.pre('save', function (next) {
    this.modifiedAt = Date.now();
    if (!this.createdAt) {
        this.createdAt = this.modifiedAt;
    }
    next();
});
exports.CandidateModel = mongoose.model('candidate', CandidateSchema, 'candidates');
/**
 * METHODS BEGIN HERE
 */
exports.Candidates = {
    getAllCandidates: () => exports.CandidateModel.find({}).sort({ createdAt: 'desc' }),
    findCandidateById: (id) => exports.CandidateModel.findById(id),
    create: (name, email) => exports.CandidateModel.create({
        name,
        email
    }),
    updateNameById: (id, name) => exports.CandidateModel.findByIdAndUpdate(id, { name }),
    updateEmailById: (id, email) => exports.CandidateModel.findByIdAndUpdate(id, { email }),
    updateProcessById: (id, processId) => exports.CandidateModel.findByIdAndUpdate(id, { processId }),
    updateStatusById: (id, statusId) => exports.CandidateModel.findByIdAndUpdate(id, { statusId }),
    updateRoleById: (id, roleId) => exports.CandidateModel.findByIdAndUpdate(id, { roleId }),
    updateTypeById: (id, typeId) => exports.CandidateModel.findByIdAndUpdate(id, { typeId }),
    updateSourceById: (id, sourceId) => exports.CandidateModel.findByIdAndUpdate(id, { sourceId }),
    updateBTSIdById: (id, BTSId) => exports.CandidateModel.findByIdAndUpdate(id, { BTSId }),
    updatescheduledTimeById: (id, scheduledTime) => exports.CandidateModel.findByIdAndUpdate(id, { scheduledTime }),
    deleteById: (id) => exports.CandidateModel.findByIdAndDelete(id)
};
//# sourceMappingURL=candidates.js.map