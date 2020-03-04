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
const RoleSchema = new mongoose.Schema({
    name: {
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
RoleSchema.pre('save', function (next) {
    this.modifiedAt = Date.now();
    if (!this.createdAt) {
        this.createdAt = this.modifiedAt;
    }
    next();
});
exports.RoleModel = mongoose.model('role', RoleSchema, 'roles');
/**
 * METHODS BEGIN HERE
 */
exports.Roles = {
    getAllRoles: () => exports.RoleModel.find({}).sort({ createdAt: 'desc' }),
    findRoleById: (id) => exports.RoleModel.findById(id),
    create: (name) => exports.RoleModel.create({ name }),
    updateNameById: (id, name) => exports.RoleModel.findByIdAndUpdate(id, { name }),
    deleteById: (id) => exports.RoleModel.findByIdAndDelete(id)
};
//# sourceMappingURL=role.js.map