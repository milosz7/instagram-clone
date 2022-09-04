import { model, Schema, InferSchemaType } from 'mongoose';

const commentSchema = new Schema({
  content: { type: String, required: true },
  postId: { type: Schema.Types.ObjectId, required: true },
  published: { type: Date, required: true },
  likedBy: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }] },
});

type CommentModel = InferSchemaType<typeof commentSchema>;

const Comment = model<CommentModel>('Comment', commentSchema);

export default Comment;
