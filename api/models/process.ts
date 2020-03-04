import * as mongoose from 'mongoose';

/**
 * INTERFACES ARE DECLARE HERE
 */

export interface IProcessModel extends mongoose.Document {
  name: string;
  color: string;
  createdAt: number;
  modifiedAt: number;
}

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

ProcessSchema.pre<IProcessModel>('save', function(next) {
  this.modifiedAt = Date.now();
  if (!this.createdAt) {
    this.createdAt = this.modifiedAt;
  }
  next();
});

/**
 * TYPES BEGIN HERE
 */

export type IProcessQuery = mongoose.DocumentQuery<IProcessModel | null, IProcessModel, {}>;

export type IProcessesQuery = mongoose.DocumentQuery<IProcessModel[], IProcessModel, {}>;

export const ProcessModel = mongoose.model<IProcessModel>('process', ProcessSchema, 'processes');

/**
 * METHODS BEGIN HERE
 */
export const Processes = {
  getAllProcesses: (): IProcessesQuery => ProcessModel.find({}).sort({ createdAt: 'desc' }),
  findProcessById: (id: string): IProcessQuery => ProcessModel.findById(id),
  create: (name: string, color: string): Promise<IProcessModel> => ProcessModel.create({ name, color }),
  updateNameById: (id: string, name: string): IProcessQuery => ProcessModel.findByIdAndUpdate(id, { name }),
  deleteById: (id: string): IProcessQuery => ProcessModel.findByIdAndDelete(id)
};
