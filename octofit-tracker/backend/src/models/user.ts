import { model, Model, Schema, Types } from 'mongoose';

export interface UserDocument {
  username: string;
  email: string;
  displayName: string;
  team?: Types.ObjectId;
}

const userSchema: Schema<UserDocument> = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    displayName: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export const User: Model<UserDocument> = model('User', userSchema);
