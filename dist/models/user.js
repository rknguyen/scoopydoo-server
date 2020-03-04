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
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
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
UserSchema.pre('save', function (next) {
    this.modifiedAt = Date.now();
    if (!this.createdAt) {
        this.createdAt = this.modifiedAt;
    }
    next();
});
exports.UserModel = mongoose.model('user', UserSchema, 'users');
/**
 * METHODS BEGIN HERE
 */
exports.Users = {
    getAllUsers: () => exports.UserModel.find({}).sort({ createdAt: 'desc' }),
    findUserById: (id) => exports.UserModel.findById(id),
    findUserByUsername: (username) => exports.UserModel.findOne({ username }),
    findUserByCredentials: (username, password) => exports.UserModel.findOne({ username, password }),
    create: (username, password, fullName) => exports.UserModel.create({ username, password, fullName }),
    updatePasswordById: (id, password) => exports.UserModel.findByIdAndUpdate(id, { password }),
    deleteById: (id) => exports.UserModel.findByIdAndDelete(id)
};
//# sourceMappingURL=user.js.map