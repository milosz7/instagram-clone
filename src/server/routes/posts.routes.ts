import express from 'express';
import postsMethods from '../methods/posts.methods';

const router = express.Router();

router.route('/load').get(postsMethods.load);

router.route('/:id').get(postsMethods.getById);

export default router;
