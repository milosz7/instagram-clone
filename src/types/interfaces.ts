import mongoose, { Schema } from 'mongoose';
import { NextFunction } from 'express';

export interface TrimmedPost {
  id: mongoose.Types.ObjectId;
  desc?: string;
  comments: Schema.Types.ObjectId[];
  published: string;
  likedBy: Schema.Types.ObjectId[];
  photo: string;
  avatar: string;
  username: string;
}

export interface PopulatedPost {
  _id: mongoose.Types.ObjectId;
  desc?: string;
  comments: Schema.Types.ObjectId[];
  published: string;
  likedBy: Schema.Types.ObjectId[];
  photo: Buffer;
  userData: {
    avatar: Buffer;
    username: string;
  };
}

export interface PassedUserData {
  username: string;
  password: string;
  email: string;
  phone: string;
}

export interface NextError extends NextFunction {
  (err?: {message: string, status: number}): void;
}
