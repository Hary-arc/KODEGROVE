import express from 'express';
import { RequestHandler } from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getDashboardData,
  getUserProjects,
  getUserInvoices,
  getUserSupportTickets,
  getUserAnalytics,
} from '../controllers/dashboardController.js';

const router = express.Router();

// All dashboard routes require authentication
router.use(protect);

// Main dashboard data
router.get('/', getDashboardData as unknown as RequestHandler);

// Individual data endpoints
router.get('/projects', getUserProjects as unknown as RequestHandler);
router.get('/invoices', getUserInvoices as unknown as RequestHandler);
router.get('/support', getUserSupportTickets as unknown as RequestHandler);
router.get('/analytics', getUserAnalytics as unknown as RequestHandler);

export default router;
