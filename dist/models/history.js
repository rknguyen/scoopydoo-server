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
const HistorySchema = new mongoose.Schema({
    candidateId: {
        type: String,
        required: true
    },
    actionType: {
        type: String,
        required: true
    },
    actorId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
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
HistorySchema.pre('save', function (next) {
    this.modifiedAt = Date.now();
    if (!this.createdAt) {
        this.createdAt = this.modifiedAt;
    }
    next();
});
exports.HistoryModel = mongoose.model('history', HistorySchema, 'histories');
/**
 * METHODS BEGIN HERE
 */
exports.Histories = {
    findHistoryByCandidateId: (candidateId) => exports.HistoryModel.find({ candidateId }).sort({ createdAt: 'desc' }),
    create: (candidateId, actionType, actorId, comment) => exports.HistoryModel.create({ candidateId, actionType, actorId, comment })
};
//# sourceMappingURL=history.js.map