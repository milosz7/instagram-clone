import mongoose, { MongooseError } from 'mongoose';
import { config } from 'dotenv';
import { PopulatedPost } from '../types/interfaces';
config();

export const validateEmail = (email: string) => {
  const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailRegexp.test(email);
};

export const validateUsername = (username: string) => {
  const usernameRegexp = /([A-Z]|[a-z]|[0-9]|[._-])\w+/;
  return usernameRegexp.test(username);
};

export const validatePhoneNumber = (number: string) => {
  const phoneNumberRegexp =
    /(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-8]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}/;
  return phoneNumberRegexp.test(number);
};

export const validatePassword = (password: string) => {
  const passwordRegexp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,}$/;
  return passwordRegexp.test(password);
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

export const trimPostData = (post: PopulatedPost) => {
  const trimmedPost = {
    id: post._id,
    desc: post.desc,
    likedBy: post.likedBy,
    published: post.published,
    comments: post.comments,
    photo: bufferToLink(post.photo),
    username: post.userData.username,
    avatar: bufferToLink(post.userData.avatar),
  };
  return trimmedPost;
}
