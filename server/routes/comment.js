import { Router } from 'express';
import { createComment } from '../controllers/comment.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

//http://localhost:3002/api/comments/:id
router.post('/:id', checkAuth, createComment);

export default router;
