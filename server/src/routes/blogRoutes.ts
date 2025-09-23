import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';

const router = express.Router();

router.route('/')
  .get(getBlogs)
  .post(protect, authorize('admin'), createBlog);

router.route('/:id')
  .get(getBlog)
  .put(protect, authorize('admin'), updateBlog)
  .delete(protect, authorize('admin'), deleteBlog);

export default router;