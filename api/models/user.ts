import * as mongoose from 'mongoose';

/**
 * INTERFACES ARE DECLARE HERE
 */

export interface IUserModel extends mongoose.Document {
  username: string;
  password: string;
  fullName: string;
  createdAt: number;
  modifiedAt: number;
}

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

UserSchema.pre<IUserModel>('save', function(next) {
  this.modifiedAt = Date.now();
  if (!this.createdAt) {
    this.createdAt = this.modifiedAt;
  }
  next();
});

/**
 * TYPES BEGIN HERE
 */

export type IUserQuery = mongoose.DocumentQuery<IUserModel | null, IUserModel, {}>;

export type IUsersQuery = mongoose.DocumentQuery<IUserModel[], IUserModel, {}>;

export const UserModel = mongoose.model<IUserModel>('user', UserSchema, 'users');

/**
 * METHODS BEGIN HERE
 */
export const Users = {
  getAllUsers: (): IUsersQuery => UserModel.find({}).sort({ createdAt: 'desc' }),
  findUserById: (id: string): IUserQuery => UserModel.findById(id),
  findUserByUsername: (username: string): IUserQuery => UserModel.findOne({ username }),
  findUserByCredentials: (username: string, password: string): IUserQuery =>
    UserModel.findOne({ username, password }),
  create: (username: string, password: string, fullName: string): Promise<IUserModel> =>
    UserModel.create({ username, password, fullName }),
  updatePasswordById: (id: string, password: string): IUserQuery =>
    UserModel.findByIdAndUpdate(id, { password }),
  deleteById: (id: string): IUserQuery => UserModel.findByIdAndDelete(id)
};
