import { Router } from 'express';
import {
  createPost,
  getAllPosts,
  getById,
  getMyPosts,
  removePost,
} from '../controllers/posts.js';

import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

//create Post
//http://localhost:3002/api/posts
router.post('/', checkAuth, createPost);

//http://localhost:3002/api/posts
router.get('/', getAllPosts);

//http://localhost:3002/api/posts/:id
router.get('/:id', getById);

//http://localhost:3002/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts);
router.get('/:id', checkAuth, removePost);

export default router;
