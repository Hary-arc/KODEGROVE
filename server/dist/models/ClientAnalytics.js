export class ClientAnalytics {
  id;
  userId;
  metricDate;
  totalProjects;
  activeProjects;
  completedProjects;
  totalInvestment;
  spentAmount;
  onTimeDeliveryRate;
  satisfactionScore;
  avgProjectDuration;
  createdAt;
  constructor(data) {
    this.id = data.id || crypto.randomUUID();
    this.userId = data.userId;
    this.metricDate = data.metricDate || new Date().toISOString().split('T')[0];
    this.totalProjects = data.totalProjects || 0;
    this.activeProjects = data.activeProjects || 0;
    this.completedProjects = data.completedProjects || 0;
    this.totalInvestment = data.totalInvestment || 0;
    this.spentAmount = data.spentAmount || 0;
    this.onTimeDeliveryRate = data.onTimeDeliveryRate || 0;
    this.satisfactionScore = data.satisfactionScore || 0;
    this.avgProjectDuration = data.avgProjectDuration || 0;
    this.createdAt = data.createdAt || new Date().toISOString();
  }
  static calculateStats(projects, invoices, surveys) {
    const activeStatuses = ['planning', 'development', 'testing', 'deployment'];
    const activeProjects = projects.filter(p => activeStatuses.includes(p.status));
    const completedProjects = projects.filter(p => p.status === 'completed');
    const totalInvestment = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
    const onTimeProjects = completedProjects.filter(
      p =>
        p.actualCompletion &&
        p.expectedCompletion &&
        new Date(p.actualCompletion) <= new Date(p.expectedCompletion)
    );
    const onTimeDeliveryRate =
      completedProjects.length > 0 ? (onTimeProjects.length / completedProjects.length) * 100 : 0;
    const avgSatisfaction =
      surveys.length > 0
        ? surveys.reduce((sum, s) => sum + (s.overallRating || 0), 0) / surveys.length
        : 0;
    const avgDuration =
      completedProjects.length > 0
        ? completedProjects.reduce((sum, p) => {
            if (p.actualCompletion && p.startDate) {
              const start = new Date(p.startDate);
              const end = new Date(p.actualCompletion);
              const months = (end.getTime() - start.getTime()) / (30.44 * 24 * 60 * 60 * 1000);
              return sum + months;
            }
            return sum;
          }, 0) / completedProjects.length
        : 0;
    // Find next milestone
    const upcomingMilestones = projects
      .filter(p => activeStatuses.includes(p.status) && p.expectedCompletion)
      .sort(
        (a, b) =>
          new Date(a.expectedCompletion).getTime() - new Date(b.expectedCompletion).getTime()
      );
    const nextMilestone =
      upcomingMilestones.length > 0
        ? `${upcomingMilestones[0].name} - ${new Date(upcomingMilestones[0].expectedCompletion).toLocaleDateString()}`
        : 'No upcoming milestones';
    return {
      totalProjects: projects.length,
      activeProjects: activeProjects.length,
      completedProjects: completedProjects.length,
      totalInvestment,
      onTimeDelivery: Math.round(onTimeDeliveryRate * 100) / 100,
      satisfactionScore: Math.round(avgSatisfaction * 10) / 10,
      avgProjectDuration: Math.round(avgDuration * 10) / 10,
      nextMilestone,
    };
  }
  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      metricDate: this.metricDate,
      totalProjects: this.totalProjects,
      activeProjects: this.activeProjects,
      completedProjects: this.completedProjects,
      totalInvestment: this.totalInvestment,
      spentAmount: this.spentAmount,
      onTimeDeliveryRate: this.onTimeDeliveryRate,
      satisfactionScore: this.satisfactionScore,
      avgProjectDuration: this.avgProjectDuration,
      createdAt: this.createdAt,
    };
  }
}
