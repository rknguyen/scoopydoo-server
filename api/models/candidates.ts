import * as mongoose from 'mongoose';

/**
 * INTERFACES ARE DECLARE HERE
 */

export interface ICandidateModel extends mongoose.Document {
  name: string;
  email: string;
  processId: string;
  statusId: string;
  roleId: string;
  typeId: string;
  sourceId: string;
  BTSId: string;
  scheduledTime: number;
  createdAt: number;
  modifiedAt: number;
}

const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  processId: {
    type: String,
    required: false
  },
  statusId: {
    type: String,
    required: false
  },
  roleId: {
    type: String,
    required: false
  },
  typeId: {
    type: String,
    required: false
  },
  sourceId: {
    type: String,
    required: false
  },
  BTSId: {
    type: String,
    required: false
  },
  scheduledTime: {
    type: Number,
    required: false
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

CandidateSchema.pre<ICandidateModel>('save', function(next) {
  this.modifiedAt = Date.now();
  if (!this.createdAt) {
    this.createdAt = this.modifiedAt;
  }
  next();
});

/**
 * TYPES BEGIN HERE
 */

export type ICandidateQuery = mongoose.DocumentQuery<ICandidateModel | null, ICandidateModel, {}>;

export type ICandidatesQuery = mongoose.DocumentQuery<ICandidateModel[], ICandidateModel, {}>;

export const CandidateModel = mongoose.model<ICandidateModel>('candidate', CandidateSchema, 'candidates');

/**
 * METHODS BEGIN HERE
 */
export const Candidates = {
  getAllCandidates: (): ICandidatesQuery => CandidateModel.find({}).sort({ createdAt: 'desc' }),
  findCandidateById: (id: string): ICandidateQuery => CandidateModel.findById(id),
  create: (name: string, email: string): Promise<ICandidateModel> =>
    CandidateModel.create({
      name,
      email
    }),
  updateNameById: (id: string, name: string): ICandidateQuery =>
    CandidateModel.findByIdAndUpdate(id, { name }),
  updateEmailById: (id: string, email: string): ICandidateQuery =>
    CandidateModel.findByIdAndUpdate(id, { email }),
  updateProcessById: (id: string, processId: string): ICandidateQuery =>
    CandidateModel.findByIdAndUpdate(id, { processId }),
  updateStatusById: (id: string, statusId: string): ICandidateQuery =>
    CandidateModel.findByIdAndUpdate(id, { statusId }),
  updateRoleById: (id: string, roleId: string): ICandidateQuery =>
    CandidateModel.findByIdAndUpdate(id, { roleId }),
  updateTypeById: (id: string, typeId: string): ICandidateQuery =>
    CandidateModel.findByIdAndUpdate(id, { typeId }),
  updateSourceById: (id: string, sourceId: string): ICandidateQuery =>
    CandidateModel.findByIdAndUpdate(id, { sourceId }),
  updateBTSIdById: (id: string, BTSId: string): ICandidateQuery =>
    CandidateModel.findByIdAndUpdate(id, { BTSId }),
  updatescheduledTimeById: (id: string, scheduledTime: number): ICandidateQuery =>
    CandidateModel.findByIdAndUpdate(id, { scheduledTime }),
  deleteById: (id: string): ICandidateQuery => CandidateModel.findByIdAndDelete(id)
};
