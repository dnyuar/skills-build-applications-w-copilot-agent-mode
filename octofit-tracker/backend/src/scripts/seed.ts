import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { Activity as activity } from '../models/activity';
import { Leaderboard as leaderboard } from '../models/leaderboard';
import { Team as team } from '../models/team';
import { User as user } from '../models/user';
import { Workout as workout } from '../models/workout';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    const users = await Promise.all(
      [
        { username: 'maya-chen', email: 'maya.chen@example.com', displayName: 'Maya Chen' },
        { username: 'leo-martin', email: 'leo.martin@example.com', displayName: 'Leo Martin' },
        { username: 'amina-hassan', email: 'amina.hassan@example.com', displayName: 'Amina Hassan' },
      ].map(async (userData) => {
        const existingUser = await user.findOne({ email: userData.email });
        return existingUser ?? user.create(userData);
      }),
    );

    const teamData = {
      name: 'Summit Striders',
      description: 'A supportive crew focused on building endurance together.',
      members: users.map((member) => member._id),
    };
    const existingTeam = await team.findOne({ name: teamData.name });
    const teamRecord = existingTeam
      ? await existingTeam.set(teamData).save()
      : await team.create(teamData);

    await user.updateMany(
      { _id: { $in: users.map((member) => member._id) } },
      { $set: { team: teamRecord._id } },
    );

    const activitySamples = [
      {
        user: users[0]._id,
        type: 'Run',
        durationMinutes: 32,
        caloriesBurned: 310,
        date: new Date('2026-10-03T08:00:00.000Z'),
        notes: 'Easy riverside run',
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        durationMinutes: 45,
        caloriesBurned: 420,
        date: new Date('2026-10-04T09:00:00.000Z'),
        notes: 'Steady outdoor ride',
      },
      {
        user: users[2]._id,
        type: 'Strength training',
        durationMinutes: 38,
        caloriesBurned: 260,
        date: new Date('2026-10-05T17:30:00.000Z'),
        notes: 'Full-body circuit',
      },
    ];

    for (const activitySample of activitySamples) {
      const activityData = { ...activitySample, team: teamRecord._id };
      const existingActivity = await activity.findOne({
        user: activitySample.user,
        date: activitySample.date,
        type: activitySample.type,
      });
      if (existingActivity) {
        await existingActivity.set(activityData).save();
      } else {
        await activity.create(activityData);
      }
    }

    const leaderboardSamples = [
      { user: users[0]._id, points: 820, rank: 1 },
      { user: users[1]._id, points: 735, rank: 2 },
      { user: users[2]._id, points: 690, rank: 3 },
    ];

    for (const entry of leaderboardSamples) {
      const leaderboardData = { user: entry.user, team: teamRecord._id, points: entry.points, rank: entry.rank };
      const existingEntry = await leaderboard.findOne({ user: entry.user });
      if (existingEntry) {
        await existingEntry.set(leaderboardData).save();
      } else {
        await leaderboard.create(leaderboardData);
      }
    }

    const workoutSamples = [
      {
        title: 'Beginner Cardio Builder',
        description: 'A gentle session to build an aerobic base.',
        difficulty: 'beginner' as const,
        durationMinutes: 25,
        equipment: ['Comfortable shoes'],
        instructions: ['Warm up with a brisk walk.', 'Alternate easy jogging and walking.', 'Cool down and stretch.'],
      },
      {
        title: 'Bodyweight Strength Circuit',
        description: 'A balanced strength session using basic movements.',
        difficulty: 'intermediate' as const,
        durationMinutes: 35,
        equipment: ['Exercise mat'],
        instructions: ['Complete squats and incline push-ups.', 'Add reverse lunges and a plank.', 'Repeat the circuit three times.'],
      },
      {
        title: 'Mobility Reset',
        description: 'A recovery-focused flow for hips, shoulders, and back.',
        difficulty: 'beginner' as const,
        durationMinutes: 20,
        equipment: ['Exercise mat'],
        instructions: ['Start with cat-cow movements.', 'Flow through hip and shoulder mobility.', 'Finish with relaxed breathing.'],
      },
    ];

    for (const workoutData of workoutSamples) {
      const existingWorkout = await workout.findOne({ title: workoutData.title });
      if (existingWorkout) {
        await existingWorkout.set(workoutData).save();
      } else {
        await workout.create(workoutData);
      }
    }

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
