import mongoose, { MongooseError } from 'mongoose';
import { config } from 'dotenv';
import Post from '../server/models/Post.model';
config();

export const validateEmail = (email: string) => {
  const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailRegexp.test(email);
};

export const validateUsername = (username: string) => {
  const usernameRegexp = /([A-Z]|[a-z]|[0-9]|[._-])\w+/;
  return usernameRegexp.test(username);
};

const declareUri = () => {
  return process.env.NODE_ENV === 'development'
    ? process.env.DB_DEV_CONN_STRING!
    : process.env.DB_PROD_CONN_STRING!;
};

export const connectToDb = async () => {
  mongoose.connection.on('error', (err: MongooseError) => console.log(err));
  mongoose.connection.once('connected', () => console.log('Connected to database'));
  await mongoose.connect(declareUri());
};

export const bufferToLink = (buffer: Buffer) => {
  return `data:image/jpeg;base64,${buffer.toString('base64')}`;
};
