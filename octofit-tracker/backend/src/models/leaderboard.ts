import { model, Model, Schema, Types } from 'mongoose';

export interface LeaderboardDocument {
  user: Types.ObjectId;
  team: Types.ObjectId;
  points: number;
  rank: number;
}

const leaderboardSchema: Schema<LeaderboardDocument> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0, default: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export const Leaderboard: Model<LeaderboardDocument> = model('Leaderboard', leaderboardSchema);
