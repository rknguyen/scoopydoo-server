import * as mongoose from 'mongoose';

/**
 * INTERFACES ARE DECLARE HERE
 */

export interface ISourceModel extends mongoose.Document {
  name: string;
  color: string;
  createdAt: number;
  modifiedAt: number;
}

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

SourceSchema.pre<ISourceModel>('save', function(next) {
  this.modifiedAt = Date.now();
  if (!this.createdAt) {
    this.createdAt = this.modifiedAt;
  }
  next();
});

/**
 * TYPES BEGIN HERE
 */

export type ISourceQuery = mongoose.DocumentQuery<ISourceModel | null, ISourceModel, {}>;

export type ISourcesQuery = mongoose.DocumentQuery<ISourceModel[], ISourceModel, {}>;

export const SourceModel = mongoose.model<ISourceModel>('source', SourceSchema, 'sources');

/**
 * METHODS BEGIN HERE
 */
export const Sources = {
  getAllSources: (): ISourcesQuery => SourceModel.find({}).sort({ createdAt: 'desc' }),
  findSourceById: (id: string): ISourceQuery => SourceModel.findById(id),
  create: (name: string, color: string): Promise<ISourceModel> => SourceModel.create({ name, color }),
  updateNameById: (id: string, name: string): ISourceQuery => SourceModel.findByIdAndUpdate(id, { name }),
  deleteById: (id: string): ISourceQuery => SourceModel.findByIdAndDelete(id)
};
