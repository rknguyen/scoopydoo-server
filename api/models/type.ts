import * as mongoose from 'mongoose';

/**
 * INTERFACES ARE DECLARE HERE
 */

export interface ITypeModel extends mongoose.Document {
  name: string;
  color: string;
  createdAt: number;
  modifiedAt: number;
}

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

TypeSchema.pre<ITypeModel>('save', function(next) {
  this.modifiedAt = Date.now();
  if (!this.createdAt) {
    this.createdAt = this.modifiedAt;
  }
  next();
});

/**
 * TYPES BEGIN HERE
 */

export type ITypeQuery = mongoose.DocumentQuery<ITypeModel | null, ITypeModel, {}>;

export type ITypesQuery = mongoose.DocumentQuery<ITypeModel[], ITypeModel, {}>;

export const TypeModel = mongoose.model<ITypeModel>('type', TypeSchema, 'types');

/**
 * METHODS BEGIN HERE
 */
export const Types = {
  getAllTypes: (): ITypesQuery => TypeModel.find({}).sort({ createdAt: 'desc' }),
  findTypeById: (id: string): ITypeQuery => TypeModel.findById(id),
  create: (name: string, color: string): Promise<ITypeModel> => TypeModel.create({ name, color }),
  updateNameById: (id: string, name: string): ITypeQuery => TypeModel.findByIdAndUpdate(id, { name }),
  deleteById: (id: string): ITypeQuery => TypeModel.findByIdAndDelete(id)
};
