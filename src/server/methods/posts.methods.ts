import { NextFunction, Request, Response } from 'express';
import Post from '../models/Post.model';
import User from '../models/User.model';
import { TrimmedPost } from '../../types/db-responses';
import { trimPostData } from '../../utils/helpers';

const postsMethods = {
  load: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lastId = req.query.lastid;
      const lastIdQuery = { _id: { $gt: lastId } };
      const pageLimit = 2;
      const trimmedPostData: TrimmedPost[] = [];
      const posts = await Post.find(lastId ? lastIdQuery : {})
        .populate<{ userData: { username: string; avatar: Buffer } }>({
          model: User,
          path: 'userData',
          select: ['username', 'avatar'],
        })
        .limit(pageLimit);
      if (posts.length === 0) return next({ message: 'Not found' });

      for (const post of posts) {
        const trimmedPost = trimPostData(post);
        trimmedPostData.push(trimmedPost);
      }
      return res.json(trimmedPostData);
    } catch (e) {
      console.error(e);
    }
  },
  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const requestedPostData = await Post.findById(postId).populate<{
        userData: { username: string; avatar: Buffer };
      }>({
        model: User,
        path: 'userData',
        select: ['username', 'avatar'],
      });
      if (!requestedPostData) return next({message: 'Not found'});
      const trimmedPost = trimPostData(requestedPostData);
      return res.json(trimmedPost);
    } catch (e) {
      console.error(e);
    }
  },
};

export default postsMethods;
