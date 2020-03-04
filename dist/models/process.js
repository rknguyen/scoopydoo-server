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
const ProcessSchema = new mongoose.Schema({
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
ProcessSchema.pre('save', function (next) {
    this.modifiedAt = Date.now();
    if (!this.createdAt) {
        this.createdAt = this.modifiedAt;
    }
    next();
});
exports.ProcessModel = mongoose.model('process', ProcessSchema, 'processes');
/**
 * METHODS BEGIN HERE
 */
exports.Processes = {
    getAllProcesses: () => exports.ProcessModel.find({}).sort({ createdAt: 'desc' }),
    findProcessById: (id) => exports.ProcessModel.findById(id),
    create: (name, color) => exports.ProcessModel.create({ name, color }),
    updateNameById: (id, name) => exports.ProcessModel.findByIdAndUpdate(id, { name }),
    deleteById: (id) => exports.ProcessModel.findByIdAndDelete(id)
};
//# sourceMappingURL=process.js.map