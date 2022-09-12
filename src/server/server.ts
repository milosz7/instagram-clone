import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import { connectToDb } from '../utils/helpers-server';
import postRoutes from './routes/posts.routes';
import authRoutes from './routes/auth.routes';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import cors from 'cors';
import { config } from 'dotenv';
config();

const port = process.env.PORT || 3001;
const buildDir = path.join(process.cwd() + '/build');

const app = express();

connectToDb();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
}

app.use(
  session({
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
    },
  })
);

app.use(express.static(buildDir));
app.use('/api/posts', postRoutes);
app.use('/auth', authRoutes);

app.get('/*', function (req, res) {
  res.sendFile(path.join(buildDir, 'index.html'));
});

app.use(
  (err: { status: number; message: string }, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
  }
);

app.listen(port);
