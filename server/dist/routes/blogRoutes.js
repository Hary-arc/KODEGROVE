import express from 'express';
import { protect, authorize } from '../middleware/auth';
import { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } from '../controllers/blogController';
const router = express.Router();
router.route('/')
    .get(getBlogs)
    .post(protect, authorize('admin'), createBlog);
router.route('/:id')
    .get(getBlog)
    .put(protect, authorize('admin'), updateBlog)
    .delete(protect, authorize('admin'), deleteBlog);
export default router;
