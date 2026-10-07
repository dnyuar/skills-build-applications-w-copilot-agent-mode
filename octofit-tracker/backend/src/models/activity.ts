import { model, Model, Schema, Types } from 'mongoose';

export interface ActivityDocument {
  user: Types.ObjectId;
  team: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
  notes?: string;
}

const activitySchema: Schema<ActivityDocument> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
    notes: { type: String, trim: true },
  },
  { timestamps: true },
);

activitySchema.index({ user: 1, date: 1, type: 1 }, { unique: true });

export const Activity: Model<ActivityDocument> = model('Activity', activitySchema);
