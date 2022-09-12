import { Request, Response, NextFunction } from 'express';
import { PassedUserData } from '../../types/interfaces';
import { validatePassword } from '../../utils/helpers-server';
import {
  provideData,
  usernameTaken,
  weakPassword,
  emailTaken,
  phoneTaken,
  internalServerError,
} from '../../utils/error-messages';
import { createDbPhoneQuery } from '../../utils/createDbPhoneQuery';
import User from '../models/User.model';
import bcrypt from 'bcrypt';

const authMethods = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, email, phone, username }: PassedUserData = req.body;

      if (!password || !email || !phone || !username) return next(provideData);

      if (!validatePassword(password)) return next(weakPassword);

      const isUsernameTaken = await User.findOne({ username: { $eq: username } });
      if (isUsernameTaken) return next(usernameTaken);

      const isEmailTaken = await User.findOne({ email: { $eq: email } });
      if (isEmailTaken) return next(emailTaken);

      const isPhoneTaken = await User.findOne({ phone: { $regex: createDbPhoneQuery(phone) } });
      if (isPhoneTaken) return next(phoneTaken);

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        phone,
        username,
        password: hashedPassword,
      });
      await newUser.save();
      return res.json({ message: 'Success' });
    } catch {
      return next(internalServerError);
    }
  },
};

export default authMethods;
