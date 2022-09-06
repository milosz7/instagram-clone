import {Types, model, Schema } from 'mongoose';

const postSchema = new Schema({
  userData: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  desc: { type: String },
  published: { type: Date, required: true },
  photo: { type: Schema.Types.Buffer, required: true },
  likedBy: { type: [{type: Schema.Types.ObjectId, ref: 'User'}] },
  comments: { type: [{ type: Schema.Types.ObjectId, ref: 'Comment'}] },
});

interface PostModel {
  _id: Types.ObjectId;
  userData: Schema.Types.ObjectId;
  desc?: string;
  published: string;
  photo: Buffer;
  likedBy: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[]
}

const Post = model<PostModel>('Post', postSchema);

export default Post;
