import { model, Schema } from 'mongoose';
import { validateEmail, validatePhoneNumber, validateUsername } from '../../utils/validators';

const userSchema = new Schema({
  email: { type: String, required: true, validate: validateEmail, unique: true },
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 16,
    validate: validateUsername,
    unique: true,
  },
  phone: { type: String, required: true, unique: true, validate: validatePhoneNumber },
  posts: { type: [{ type: Schema.Types.ObjectId, ref: 'Post' }] },
  following: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }] },
  followers: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }] },
  password: { type: String, required: true },
  profileDesc: { type: String, maxLength: 50 },
  avatar: { type: Schema.Types.Buffer },
});

interface UserModel {
  email: string;
  username: string;
  posts: Schema.Types.ObjectId[];
  following: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  password: string;
  profileDesc?: string;
  avatar?: Buffer;
}

const User = model<UserModel>('User', userSchema);

export default User;
