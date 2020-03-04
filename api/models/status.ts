import * as mongoose from 'mongoose';

/**
 * INTERFACES ARE DECLARE HERE
 */

export interface IStatusModel extends mongoose.Document {
  name: string;
  color: string;
  createdAt: number;
  modifiedAt: number;
}

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

StatusSchema.pre<IStatusModel>('save', function(next) {
  this.modifiedAt = Date.now();
  if (!this.createdAt) {
    this.createdAt = this.modifiedAt;
  }
  next();
});

/**
 * TYPES BEGIN HERE
 */

export type IStatusQuery = mongoose.DocumentQuery<IStatusModel | null, IStatusModel, {}>;

export type IStatusesQuery = mongoose.DocumentQuery<IStatusModel[], IStatusModel, {}>;

export const StatusModel = mongoose.model<IStatusModel>('status', StatusSchema, 'statuses');

/**
 * METHODS BEGIN HERE
 */
export const Statuses = {
  getAllStatuses: (): IStatusesQuery => StatusModel.find({}).sort({ createdAt: 'desc' }),
  findStatusById: (id: string): IStatusQuery => StatusModel.findById(id),
  create: (name: string, color: string): Promise<IStatusModel> => StatusModel.create({ name, color }),
  updateNameById: (id: string, name: string): IStatusQuery => StatusModel.findByIdAndUpdate(id, { name }),
  deleteById: (id: string): IStatusQuery => StatusModel.findByIdAndDelete(id)
};
