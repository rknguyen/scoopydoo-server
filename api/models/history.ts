import * as mongoose from 'mongoose';

/**
 * INTERFACES ARE DECLARE HERE
 */

export interface IHistoryModel extends mongoose.Document {
  candidateId: string;
  actionType: string;
  actorId: string;
  comment: string;
  createdAt: number;
  modifiedAt: number;
}

const HistorySchema = new mongoose.Schema({
  candidateId: {
    type: String,
    required: true
  },
  actionType: {
    type: String,
    required: true
  },
  actorId: {
    type: String,
    required: true
  },
  comment: {
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

HistorySchema.pre<IHistoryModel>('save', function(next) {
  this.modifiedAt = Date.now();
  if (!this.createdAt) {
    this.createdAt = this.modifiedAt;
  }
  next();
});

/**
 * TYPES BEGIN HERE
 */

export type IHistoryQuery = mongoose.DocumentQuery<IHistoryModel | null, IHistoryModel, {}>;

export type IHistoriesQuery = mongoose.DocumentQuery<IHistoryModel[], IHistoryModel, {}>;

export const HistoryModel = mongoose.model<IHistoryModel>('history', HistorySchema, 'histories');

/**
 * METHODS BEGIN HERE
 */
export const Histories = {
  findHistoryByCandidateId: (candidateId: string): IHistoriesQuery =>
    HistoryModel.find({ candidateId }).sort({ createdAt: 'desc' }),
  create: (
    candidateId: string,
    actionType: string,
    actorId: string,
    comment: string
  ): Promise<IHistoryModel> => HistoryModel.create({ candidateId, actionType, actorId, comment })
};
