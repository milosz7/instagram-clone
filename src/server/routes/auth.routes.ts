import express from 'express';
import authMethods from '../methods/auth.methods';

const router = express.Router();

router.route('/register').post(authMethods.register);

router.route('/login').post();

router.route('/logout').delete();

export default router;
