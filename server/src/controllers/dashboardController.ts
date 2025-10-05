import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import {
  projectStore,
  invoiceStore,
  supportTicketStore,
  clientAnalyticsStore,
  Project,
  Invoice,
  SupportTicket,
  ClientAnalytics,
} from '../models/index.js';

// @desc    Get user dashboard data
// @route   GET /api/dashboard
// @access  Private
export const getDashboardData = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    // Fetch user's data with proper typing
    const projects = await projectStore.findAll((p: Project) => p.userId === userId);
    const invoices = await invoiceStore.findAll((i: Invoice) => i.userId === userId);
    const supportTickets = await supportTicketStore.findAll(
      (t: SupportTicket) => t.userId === userId
    );

    // Calculate current stats
    const stats = ClientAnalytics.calculateStats(projects, invoices, []);

    // Get recent activity
    const recentProjects = projects
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);

    const recentInvoices = invoices
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);

    const openTickets = supportTickets.filter(t => ['open', 'in-progress'].includes(t.status));

    // Generate notifications
    const notifications = await generateNotifications(userId, projects, invoices, supportTickets);

    res.status(200).json({
      success: true,
      data: {
        stats,
        projects: recentProjects,
        invoices: recentInvoices,
        supportTickets: openTickets,
        notifications,
      },
    });
  } catch (error: any) {
    console.error('Dashboard data error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching dashboard data',
    });
  }
};

// @desc    Get user projects
// @route   GET /api/dashboard/projects
// @access  Private
export const getUserProjects = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }
    const { status, limit = 10, offset = 0 } = req.query;

    let projects = await projectStore.findAll((p: Project) => p.userId === userId);

    // Filter by status if provided
    if (status && typeof status === 'string') {
      projects = projects.filter(p => p.status === status);
    }

    // Sort by most recent
    projects.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    // Apply pagination
    const startIndex = parseInt(offset as string);
    const limitNum = parseInt(limit as string);
    const paginatedProjects = projects.slice(startIndex, startIndex + limitNum);

    res.status(200).json({
      success: true,
      data: {
        projects: paginatedProjects,
        total: projects.length,
        hasMore: startIndex + limitNum < projects.length,
      },
    });
  } catch (error: any) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching projects',
    });
  }
};

// @desc    Get user invoices
// @route   GET /api/dashboard/invoices
// @access  Private
export const getUserInvoices = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }
    const { status, limit = 10, offset = 0 } = req.query;

    let invoices = await invoiceStore.findAll((i: Invoice) => i.userId === userId);

    // Filter by status if provided
    if (status && typeof status === 'string') {
      invoices = invoices.filter(i => i.status === status);
    }

    // Sort by most recent
    invoices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Apply pagination
    const startIndex = parseInt(offset as string);
    const limitNum = parseInt(limit as string);
    const paginatedInvoices = invoices.slice(startIndex, startIndex + limitNum);

    res.status(200).json({
      success: true,
      data: {
        invoices: paginatedInvoices,
        total: invoices.length,
        hasMore: startIndex + limitNum < invoices.length,
      },
    });
  } catch (error: any) {
    console.error('Get invoices error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching invoices',
    });
  }
};

// @desc    Get user support tickets
// @route   GET /api/dashboard/support
// @access  Private
export const getUserSupportTickets = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }
    const { status, limit = 10, offset = 0 } = req.query;

    let tickets = await supportTicketStore.findAll((t: SupportTicket) => t.userId === userId);

    // Filter by status if provided
    if (status && typeof status === 'string') {
      tickets = tickets.filter(t => t.status === status);
    }

    // Sort by most recent
    tickets.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    // Apply pagination
    const startIndex = parseInt(offset as string);
    const limitNum = parseInt(limit as string);
    const paginatedTickets = tickets.slice(startIndex, startIndex + limitNum);

    res.status(200).json({
      success: true,
      data: {
        tickets: paginatedTickets,
        total: tickets.length,
        hasMore: startIndex + limitNum < tickets.length,
      },
    });
  } catch (error: any) {
    console.error('Get support tickets error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching support tickets',
    });
  }
};

// @desc    Get user analytics
// @route   GET /api/dashboard/analytics
// @access  Private
export const getUserAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }
    const { period = '30' } = req.query;

    const days = parseInt(period as string);
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const analytics = await clientAnalyticsStore.findAll(
      (a: ClientAnalytics) =>
        a.userId === userId &&
        new Date(a.metricDate) >= startDate &&
        new Date(a.metricDate) <= endDate
    );

    // Sort by date
    analytics.sort((a, b) => new Date(a.metricDate).getTime() - new Date(b.metricDate).getTime());

    // Calculate trends
    const trends = calculateTrends(analytics);

    res.status(200).json({
      success: true,
      data: {
        analytics,
        trends,
        period: days,
      },
    });
  } catch (error: any) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching analytics',
    });
  }
};

// Helper function to generate notifications
async function generateNotifications(
  userId: string,
  projects: Project[],
  invoices: Invoice[],
  tickets: SupportTicket[]
) {
  const notifications = [];

  // Project milestones
  const nearCompletionProjects = projects.filter(p => p.progress >= 75 && p.status !== 'completed');
  for (const project of nearCompletionProjects) {
    notifications.push({
      id: `milestone-${project.id}`,
      title: 'Project Milestone Reached',
      message: `${project.name} has reached ${project.progress}% completion`,
      type: 'success',
      timestamp: new Date().toISOString(),
      read: false,
      action: {
        label: 'View Project',
        url: `/dashboard/projects/${project.id}`,
      },
    });
  }

  // Overdue invoices
  const today = new Date().toISOString().split('T')[0];
  const overdueInvoices = invoices.filter(i => i.status === 'pending' && i.dueDate < today);
  for (const invoice of overdueInvoices) {
    notifications.push({
      id: `overdue-${invoice.id}`,
      title: 'Invoice Overdue',
      message: `Invoice ${invoice.invoiceNumber} is past due`,
      type: 'error',
      timestamp: new Date().toISOString(),
      read: false,
      action: {
        label: 'Pay Invoice',
        url: `/dashboard/invoices/${invoice.id}`,
      },
    });
  }

  // Due soon invoices (3 days)
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
  const dueSoonInvoices = invoices.filter(
    i => i.status === 'pending' && new Date(i.dueDate) <= threeDaysFromNow && i.dueDate >= today
  );
  for (const invoice of dueSoonInvoices) {
    notifications.push({
      id: `due-soon-${invoice.id}`,
      title: 'Invoice Due Soon',
      message: `Invoice ${invoice.invoiceNumber} is due in 3 days`,
      type: 'warning',
      timestamp: new Date().toISOString(),
      read: false,
      action: {
        label: 'Pay Invoice',
        url: `/dashboard/invoices/${invoice.id}`,
      },
    });
  }

  // Open tickets
  const openTickets = tickets.filter(t => t.status === 'open');
  if (openTickets.length > 0) {
    notifications.push({
      id: 'open-tickets',
      title: 'Open Support Tickets',
      message: `You have ${openTickets.length} open support ticket${openTickets.length > 1 ? 's' : ''}`,
      type: 'info',
      timestamp: new Date().toISOString(),
      read: false,
      action: {
        label: 'View Tickets',
        url: '/dashboard/support',
      },
    });
  }

  return notifications.slice(0, 10); // Limit to 10 notifications
}

// Helper function to calculate trends
function calculateTrends(analytics: ClientAnalytics[]) {
  if (analytics.length < 2) {
    return {
      projectGrowth: 0,
      investmentGrowth: 0,
      satisfactionTrend: 0,
    };
  }

  const latest = analytics[analytics.length - 1];
  const previous = analytics[analytics.length - 2];

  const projectGrowth = latest.totalProjects - previous.totalProjects;
  const investmentGrowth =
    previous.totalInvestment > 0
      ? ((latest.totalInvestment - previous.totalInvestment) / previous.totalInvestment) * 100
      : 0;
  const satisfactionTrend = latest.satisfactionScore - previous.satisfactionScore;

  return {
    projectGrowth,
    investmentGrowth: Math.round(investmentGrowth * 100) / 100,
    satisfactionTrend: Math.round(satisfactionTrend * 100) / 100,
  };
}
