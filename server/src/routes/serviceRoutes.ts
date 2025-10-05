import express from 'express';
import { RequestHandler } from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';

const router = express.Router();

router
  .route('/')
  .get(getServices)
  .post(protect, authorize('admin'), createService as unknown as RequestHandler);

router
  .route('/:id')
  .get(getService)
  .put(protect, authorize('admin'), updateService as unknown as RequestHandler)
  .delete(protect, authorize('admin'), deleteService);

export default router;
