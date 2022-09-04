import { describe } from 'mocha';
import chai, { expect } from 'chai';
import mongoose from 'mongoose';
import User from '../../models/User.model';
import chaiAsPromised from 'chai-as-promised';
import { config } from 'dotenv';
import path from 'path';
import fs from 'fs';

config();

const sampleImgBuffer = () => {
  return Buffer.from(fs.readFileSync(path.join(__dirname, '404.jpg')));
};

chai.use(chaiAsPromised);

describe('User model tests', () => {
  before(async () => {
    mongoose.connection.on('error', () => console.log('Failed to connect'));
    await mongoose.connect(process.env.DB_TEST_CONN_STRING as string);
  });
  describe('Population tests', () => {
    before(async () => {
      const user1 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: 'example@example.com',
        username: 'test1',
        posts: [],
        followers: [],
        following: [],
        password: 'test',
      });
      await user1.save();
      const user2 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: 'example2@example.com',
        username: 'test2',
        posts: [],
        followers: [],
        following: [],
        password: 'test',
      });
      await user2.save();
      const user3 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: 'example3@example.com',
        username: 'test3',
        posts: [],
        followers: [user1._id, user2._id],
        following: [user1._id, user2._id],
        password: 'test',
      });
      await user3.save();
    });
    it('Should populate data correctly', async () => {
      const populatedUser = await User.findOne({ username: 'test3' })
        .populate('followers')
        .populate('following');
      for (const data of populatedUser!.followers) {
        expect(data).to.have.property('username');
      }
      for (const data of populatedUser!.following) {
        expect(data).to.have.property('username');
      }
    });
    after(async () => {
      await User.deleteMany({});
    });
  });

  after(async () => {
    for (const key in mongoose.models) {
      delete mongoose.models[key];
    }
    await mongoose.connection.close();
  });
});
