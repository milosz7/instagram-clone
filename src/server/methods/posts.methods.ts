import { NextFunction, Request, Response } from 'express';
import Post from '../models/Post.model';
import User from '../models/User.model';
import { TrimmedPost } from '../../types/db-responses';
import { bufferToLink } from '../../utils/helpers';

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
      if (!posts) return next({ message: 'Not found' });

      for (const post of posts) {
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
        trimmedPostData.push(trimmedPost);
      }
      return res.json(trimmedPostData);
    } catch (e) {
      console.error(e);
    }
  },
};

export default postsMethods;
