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
const StatusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
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
StatusSchema.pre('save', function (next) {
    this.modifiedAt = Date.now();
    if (!this.createdAt) {
        this.createdAt = this.modifiedAt;
    }
    next();
});
exports.StatusModel = mongoose.model('status', StatusSchema, 'statuses');
/**
 * METHODS BEGIN HERE
 */
exports.Statuses = {
    getAllStatuses: () => exports.StatusModel.find({}).sort({ createdAt: 'desc' }),
    findStatusById: (id) => exports.StatusModel.findById(id),
    create: (name, color) => exports.StatusModel.create({ name, color }),
    updateNameById: (id, name) => exports.StatusModel.findByIdAndUpdate(id, { name }),
    deleteById: (id) => exports.StatusModel.findByIdAndDelete(id)
};
//# sourceMappingURL=status.js.map