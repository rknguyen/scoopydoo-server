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
const SourceSchema = new mongoose.Schema({
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
SourceSchema.pre('save', function (next) {
    this.modifiedAt = Date.now();
    if (!this.createdAt) {
        this.createdAt = this.modifiedAt;
    }
    next();
});
exports.SourceModel = mongoose.model('source', SourceSchema, 'sources');
/**
 * METHODS BEGIN HERE
 */
exports.Sources = {
    getAllSources: () => exports.SourceModel.find({}).sort({ createdAt: 'desc' }),
    findSourceById: (id) => exports.SourceModel.findById(id),
    create: (name, color) => exports.SourceModel.create({ name, color }),
    updateNameById: (id, name) => exports.SourceModel.findByIdAndUpdate(id, { name }),
    deleteById: (id) => exports.SourceModel.findByIdAndDelete(id)
};
//# sourceMappingURL=source.js.map