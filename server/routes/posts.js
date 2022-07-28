import { Router } from 'express';
import {
  createPost,
  getAllPosts,
  getById,
  getMyPosts,
  removePost,
  updatePost,
  getPostComments,
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

//http://localhost:3002/api/posts/:id
router.put('/:id', checkAuth, updatePost);

//http://localhost:3002/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts);

//http://localhost:3002/api/posts/:id
router.delete('/:id', checkAuth, removePost);

//http://localhost:3002/api/posts/comments/:id
router.get('/comments/:id', getPostComments);

export default router;
