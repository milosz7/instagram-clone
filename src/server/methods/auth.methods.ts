import { Request, Response } from 'express';
import { PassedUserData, NextError } from '../../types/interfaces';
import { validatePassword } from '../../utils/helpers-server';
import {
  provideData,
  usernameTaken,
  weakPassword,
  emailTaken,
  phoneTaken,
  provideLoginData,
  internalServerError,
  unauthorizedLogin,
} from '../../utils/error-messages';
import { createDbPhoneQuery } from '../../utils/createDbPhoneQuery';
import User from '../models/User.model';
import bcrypt from 'bcrypt';

const authMethods = {
  register: async (req: Request, res: Response, next: NextError) => {
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
  login: async (req: Request, res: Response, next: NextError) => {
    try {
      const { password, username }: { password?: string; username?: string } = req.body;
      if (!password || !username) return next(provideLoginData);

      const requestedUser = await User.findOne({ username: { $eq: username } });
      if (!requestedUser) return next(unauthorizedLogin);

      const isPasswordMatching = await bcrypt.compare(password, requestedUser.password);
      if (!isPasswordMatching) return next(unauthorizedLogin);
      req.session.user = {
        username: requestedUser.username,
        id: requestedUser._id,
      };
      return res.status(200).json({ message: 'Logged in succesfully!' });
    } catch {
      return next(internalServerError);
    }
  },
  logout: async (req: Request, res: Response, next: NextError) => {
    req.session.destroy((err) => {
      if (err) return next(internalServerError);
    });
    return res.status(200).json({ message: 'Logged out succesfully.' });
  },
  isLoggedIn: (req: Request, res: Response, next: NextError) => {
    if (req.session.user) return res.json({ logged: true });
    return res.json({ logged: false });
  },
};

export default authMethods;
