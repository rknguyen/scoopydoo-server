import * as mongoose from 'mongoose';

/**
 * INTERFACES ARE DECLARE HERE
 */

export interface IRoleModel extends mongoose.Document {
  name: string;
  createdAt: number;
  modifiedAt: number;
}

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

RoleSchema.pre<IRoleModel>('save', function(next) {
  this.modifiedAt = Date.now();
  if (!this.createdAt) {
    this.createdAt = this.modifiedAt;
  }
  next();
});

/**
 * TYPES BEGIN HERE
 */

export type IRoleQuery = mongoose.DocumentQuery<IRoleModel | null, IRoleModel, {}>;

export type IRolesQuery = mongoose.DocumentQuery<IRoleModel[], IRoleModel, {}>;

export const RoleModel = mongoose.model<IRoleModel>('role', RoleSchema, 'roles');

/**
 * METHODS BEGIN HERE
 */
export const Roles = {
  getAllRoles: (): IRolesQuery => RoleModel.find({}).sort({ createdAt: 'desc' }),
  findRoleById: (id: string): IRoleQuery => RoleModel.findById(id),
  create: (name: string): Promise<IRoleModel> => RoleModel.create({ name }),
  updateNameById: (id: string, name: string): IRoleQuery => RoleModel.findByIdAndUpdate(id, { name }),
  deleteById: (id: string): IRoleQuery => RoleModel.findByIdAndDelete(id)
};
