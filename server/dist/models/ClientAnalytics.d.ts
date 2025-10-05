export interface IClientAnalytics {
  id: string;
  userId: string;
  metricDate: string;
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalInvestment: number;
  spentAmount: number;
  onTimeDeliveryRate: number;
  satisfactionScore: number;
  avgProjectDuration: number;
  createdAt: string;
}
export interface IDashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalInvestment: number;
  onTimeDelivery: number;
  satisfactionScore: number;
  avgProjectDuration: number;
  nextMilestone: string;
  monthlyGrowth?: number;
  projectsThisMonth?: number;
  upcomingDeadlines?: number;
}
export declare class ClientAnalytics implements IClientAnalytics {
  id: string;
  userId: string;
  metricDate: string;
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalInvestment: number;
  spentAmount: number;
  onTimeDeliveryRate: number;
  satisfactionScore: number;
  avgProjectDuration: number;
  createdAt: string;
  constructor(
    data: Partial<IClientAnalytics> & {
      userId: string;
    }
  );
  static calculateStats(projects: any[], invoices: any[], surveys: any[]): IDashboardStats;
  toJSON(): IClientAnalytics;
}
