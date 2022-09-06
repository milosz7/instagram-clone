import { model, Schema, InferSchemaType } from 'mongoose';

const commentSchema = new Schema({
  content: { type: String, required: true },
  postId: { type: Schema.Types.ObjectId, required: true },
  published: { type: Date, required: true },
  likedBy: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }] },
});

interface CommentModel {
  content: string;
  postId: Schema.Types.ObjectId;
  published: Date;
  likedBy: Schema.Types.ObjectId;
}

const Comment = model<CommentModel>('Comment', commentSchema);

export default Comment;
