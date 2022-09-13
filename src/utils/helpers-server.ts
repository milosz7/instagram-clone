import mongoose, { MongooseError } from 'mongoose';
import { config } from 'dotenv';
import { PopulatedPost } from '../types/interfaces';
config();

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
