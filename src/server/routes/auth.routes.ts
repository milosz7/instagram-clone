import express from 'express';
import authMethods from '../methods/auth.methods';

const router = express.Router();

router.route('/register').post(authMethods.register);

router.route('/login').post(authMethods.login);

router.route('/logout').delete(authMethods.logout);

export default router;
