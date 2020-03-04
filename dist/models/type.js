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
const TypeSchema = new mongoose.Schema({
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
TypeSchema.pre('save', function (next) {
    this.modifiedAt = Date.now();
    if (!this.createdAt) {
        this.createdAt = this.modifiedAt;
    }
    next();
});
exports.TypeModel = mongoose.model('type', TypeSchema, 'types');
/**
 * METHODS BEGIN HERE
 */
exports.Types = {
    getAllTypes: () => exports.TypeModel.find({}).sort({ createdAt: 'desc' }),
    findTypeById: (id) => exports.TypeModel.findById(id),
    create: (name, color) => exports.TypeModel.create({ name, color }),
    updateNameById: (id, name) => exports.TypeModel.findByIdAndUpdate(id, { name }),
    deleteById: (id) => exports.TypeModel.findByIdAndDelete(id)
};
//# sourceMappingURL=type.js.map