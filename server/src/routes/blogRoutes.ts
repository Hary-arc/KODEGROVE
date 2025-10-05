import express from 'express';
import { RequestHandler } from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';

const router = express.Router();

router
  .route('/')
  .get(getBlogs)
  .post(
    protect,
    authorize('admin'),
    createBlog as unknown as RequestHandler //  QUICK FIX
  );

router
  .route('/:id')
  .get(getBlog)
  .delete(protect, authorize('admin'), deleteBlog)
  .put(
    protect,
    authorize('admin'),
    updateBlog as unknown as RequestHandler // 👈 QUICK FIX
  );

export default router;
