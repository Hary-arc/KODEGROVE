// Dashboard data structure
export interface Project {
  id: string;
  name: string;
  type: 'website' | 'mobile' | 'ecommerce' | 'saas' | 'consulting';
  status: 'planning' | 'development' | 'testing' | 'deployment' | 'completed' | 'on-hold';
  progress: number;
  startDate: string;
  expectedCompletion: string;
  budget: number;
  spent: number;
  description: string;
  team: string[];
  lastUpdate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface Invoice {
  id: string;
  projectId: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  createdDate: string;
  description: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdDate: string;
  lastResponse: string;
  category: 'technical' | 'billing' | 'general' | 'feature-request';
  messages: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
}

export interface ClientStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalInvestment: number;
  onTimeDelivery: number;
  satisfactionScore: number;
  avgProjectDuration: number;
  nextMilestone: string;
}

// Mock data for development
export const mockUser = {
  id: 'user-1',
  name: 'Sarah Johnson',
  email: 'sarah@techcorp.com',
  company: 'TechCorp Solutions',
  phone: '+1 (555) 123-4567',
  avatar:
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  joinDate: '2023-01-15',
  tier: 'Premium' as const,
  timezone: 'PST',
};

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'E-Commerce Platform Redesign',
    type: 'ecommerce',
    status: 'development',
    progress: 75,
    startDate: '2024-01-15',
    expectedCompletion: '2024-03-15',
    budget: 85000,
    spent: 63750,
    description:
      'Complete redesign of the e-commerce platform with modern UI/UX and enhanced performance.',
    team: ['Alex Rivera', 'Jordan Kim', 'Casey Chen'],
    lastUpdate: '2024-02-28',
    priority: 'high',
  },
  {
    id: 'proj-2',
    name: 'Mobile App Development',
    type: 'mobile',
    status: 'testing',
    progress: 90,
    startDate: '2023-11-01',
    expectedCompletion: '2024-02-01',
    budget: 120000,
    spent: 108000,
    description: 'Native iOS and Android app for customer engagement and sales.',
    team: ['Taylor Park', 'Morgan Davis'],
    lastUpdate: '2024-01-25',
    priority: 'urgent',
  },
  {
    id: 'proj-3',
    name: 'SEO Optimization Campaign',
    type: 'consulting',
    status: 'completed',
    progress: 100,
    startDate: '2023-09-01',
    expectedCompletion: '2023-12-01',
    budget: 25000,
    spent: 24500,
    description: 'Comprehensive SEO audit and optimization for improved search rankings.',
    team: ['Riley Johnson'],
    lastUpdate: '2023-12-01',
    priority: 'medium',
  },
  {
    id: 'proj-4',
    name: 'Brand Website Refresh',
    type: 'website',
    status: 'planning',
    progress: 15,
    startDate: '2024-02-15',
    expectedCompletion: '2024-05-15',
    budget: 45000,
    spent: 6750,
    description: 'Modern website refresh with improved user experience and mobile optimization.',
    team: ['Avery Wilson'],
    lastUpdate: '2024-02-20',
    priority: 'low',
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: 'inv-1',
    projectId: 'proj-1',
    amount: 42500,
    status: 'paid',
    dueDate: '2024-02-15',
    createdDate: '2024-01-15',
    description: 'E-Commerce Platform - 50% milestone payment',
  },
  {
    id: 'inv-2',
    projectId: 'proj-2',
    amount: 60000,
    status: 'pending',
    dueDate: '2024-03-10',
    createdDate: '2024-02-10',
    description: 'Mobile App Development - Final payment',
  },
  {
    id: 'inv-3',
    projectId: 'proj-4',
    amount: 13500,
    status: 'overdue',
    dueDate: '2024-02-28',
    createdDate: '2024-01-28',
    description: 'Brand Website - Initial payment',
  },
];

export const mockSupportTickets: SupportTicket[] = [
  {
    id: 'ticket-1',
    title: 'Login Issues on Mobile App',
    status: 'in-progress',
    priority: 'high',
    createdDate: '2024-02-25',
    lastResponse: '2024-02-26',
    category: 'technical',
    messages: 4,
  },
  {
    id: 'ticket-2',
    title: 'Request for Additional Features',
    status: 'open',
    priority: 'medium',
    createdDate: '2024-02-20',
    lastResponse: '2024-02-21',
    category: 'feature-request',
    messages: 2,
  },
  {
    id: 'ticket-3',
    title: 'Billing Question - Invoice #inv-2',
    status: 'resolved',
    priority: 'low',
    createdDate: '2024-02-10',
    lastResponse: '2024-02-12',
    category: 'billing',
    messages: 6,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'Project Milestone Completed',
    message: 'E-Commerce Platform has reached 75% completion',
    type: 'success',
    timestamp: '2024-02-28T10:30:00Z',
    read: false,
    action: {
      label: 'View Project',
      url: '/dashboard/projects/proj-1',
    },
  },
  {
    id: 'notif-2',
    title: 'Invoice Due Soon',
    message: 'Invoice #inv-2 is due in 3 days',
    type: 'warning',
    timestamp: '2024-02-27T14:15:00Z',
    read: false,
    action: {
      label: 'Pay Invoice',
      url: '/dashboard/billing/inv-2',
    },
  },
  {
    id: 'notif-3',
    title: 'Support Ticket Updated',
    message: 'Your technical support ticket has been updated',
    type: 'info',
    timestamp: '2024-02-26T16:45:00Z',
    read: true,
    action: {
      label: 'View Ticket',
      url: '/dashboard/support/ticket-1',
    },
  },
  {
    id: 'notif-4',
    title: 'Welcome to Premium Tier!',
    message: 'Your account has been upgraded to Premium with exclusive benefits',
    type: 'success',
    timestamp: '2024-02-25T09:00:00Z',
    read: true,
  },
];

export const mockStats: ClientStats = {
  totalProjects: 4,
  activeProjects: 3,
  completedProjects: 1,
  totalInvestment: 275000,
  onTimeDelivery: 95,
  satisfactionScore: 4.8,
  avgProjectDuration: 4.2,
  nextMilestone: 'Mobile App Launch - March 5th',
};

// Utility functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    paid: 'text-green-400',
    pending: 'text-yellow-400',
    overdue: 'text-red-400',
    cancelled: 'text-gray-400',
    open: 'text-blue-400',
    'in-progress': 'text-purple-400',
    resolved: 'text-green-400',
    closed: 'text-gray-400',
    planning: 'text-blue-400',
    development: 'text-yellow-400',
    testing: 'text-orange-400',
    deployment: 'text-purple-400',
    completed: 'text-green-400',
    'on-hold': 'text-gray-400',
  };
  return colors[status] || 'text-gray-400';
};

export const getPriorityColor = (priority: string): string => {
  const colors = {
    low: 'text-green-400',
    medium: 'text-yellow-400',
    high: 'text-orange-400',
    urgent: 'text-red-400',
  };
  return colors[priority as keyof typeof colors] || 'text-gray-400';
};
