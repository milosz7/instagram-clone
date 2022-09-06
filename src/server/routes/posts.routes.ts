import express from 'express';
import postsMethods from '../methods/posts.methods';

const router = express.Router();

router.route('/load').get(postsMethods.load);

export default router;
