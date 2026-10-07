import { model, Model, Schema, Types } from 'mongoose';

export interface TeamDocument {
  name: string;
  description: string;
  members: Types.ObjectId[];
}

const teamSchema: Schema<TeamDocument> = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export const Team: Model<TeamDocument> = model('Team', teamSchema);
