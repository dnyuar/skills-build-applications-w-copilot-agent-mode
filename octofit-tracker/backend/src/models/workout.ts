import { model, Model, Schema } from 'mongoose';

export interface WorkoutDocument {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  equipment: string[];
  instructions: string[];
}

const workoutSchema: Schema<WorkoutDocument> = new Schema(
  {
    title: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    equipment: [{ type: String, trim: true }],
    instructions: [{ type: String, required: true, trim: true }],
  },
  { timestamps: true },
);

export const Workout: Model<WorkoutDocument> = model('Workout', workoutSchema);
