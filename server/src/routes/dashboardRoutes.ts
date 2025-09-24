
import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getDashboardData,
  getUserProjects,
  getUserInvoices,
  getUserSupportTickets,
  getUserAnalytics
} from '../controllers/dashboardController.js';

const router = express.Router();

// All dashboard routes require authentication
router.use(protect);

// Main dashboard data
router.get('/', getDashboardData);

// Individual data endpoints
router.get('/projects', getUserProjects);
router.get('/invoices', getUserInvoices);
router.get('/support', getUserSupportTickets);
router.get('/analytics', getUserAnalytics);

export default router;
