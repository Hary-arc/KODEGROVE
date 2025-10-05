export interface IProject {
    id: string;
    userId: string;
    name: string;
    slug: string;
    type: 'website' | 'mobile' | 'ecommerce' | 'saas' | 'consulting' | 'branding';
    status: 'planning' | 'development' | 'testing' | 'deployment' | 'completed' | 'on-hold' | 'cancelled';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    progress: number;
    budget: number;
    spent: number;
    startDate: string;
    expectedCompletion?: string;
    actualCompletion?: string;
    description?: string;
    requirements?: any;
    deliverables?: any;
    createdAt: string;
    updatedAt: string;
}
export interface IProjectTeam {
    id: string;
    projectId: string;
    teamMemberName: string;
    role?: string;
    assignedAt: string;
}
export interface IProjectMilestone {
    id: string;
    projectId: string;
    name: string;
    description?: string;
    dueDate?: string;
    completedDate?: string;
    status: 'pending' | 'in-progress' | 'completed' | 'overdue';
    completionPercentage: number;
    createdAt: string;
}
export declare class Project implements IProject {
    id: string;
    userId: string;
    name: string;
    slug: string;
    type: 'website' | 'mobile' | 'ecommerce' | 'saas' | 'consulting' | 'branding';
    status: 'planning' | 'development' | 'testing' | 'deployment' | 'completed' | 'on-hold' | 'cancelled';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    progress: number;
    budget: number;
    spent: number;
    startDate: string;
    expectedCompletion?: string;
    actualCompletion?: string;
    description?: string;
    requirements?: any;
    deliverables?: any;
    createdAt: string;
    updatedAt: string;
    constructor(data: Partial<IProject> & {
        userId: string;
        name: string;
        type: IProject['type'];
        budget: number;
        startDate: string;
    });
    private generateSlug;
    validate(): {
        isValid: boolean;
        errors: string[];
    };
    updateProgress(newProgress: number): void;
    addExpense(amount: number): void;
    toJSON(): IProject;
}
