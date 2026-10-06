import express from 'express';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database';
import { Activity } from './models/activity';
import { Leaderboard } from './models/leaderboard';
import { Team } from './models/team';
import { User } from './models/user';
import { Workout } from './models/workout';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
]);

app.use((request, response, next) => {
  const origin = request.get('origin');
  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.vary('Origin');
  }

  if (request.method === 'OPTIONS') {
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: mongoose.connection.readyState === 1 ? 'ok' : 'unavailable' });
});

function listCollection<T>(query: () => Promise<T>) {
  return async (_request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      response.json(await query());
    } catch (error) {
      next(error);
    }
  };
}

app.get('/api/users/', listCollection(() => User.find().populate('team').lean().exec()));
app.get('/api/teams/', listCollection(() => Team.find().populate('members').lean().exec()));
app.get('/api/activities/', listCollection(() => Activity.find().populate('user team').lean().exec()));
app.get(
  '/api/leaderboard/',
  listCollection(() => Leaderboard.find().sort({ rank: 1 }).populate('user team').lean().exec()),
);
app.get('/api/workouts/', listCollection(() => Workout.find().lean().exec()));

app.use(
  (error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    console.error('API request failed:', error);
    response.status(500).json({ error: 'Internal server error' });
  },
);

async function startServer(): Promise<void> {
  await connectDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening at ${apiBaseUrl}`);
  });
}

void startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit API:', error);
  process.exitCode = 1;
});
// comment
