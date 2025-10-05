import { authUtils } from './auth';

const API_BASE_URL =
  window.location.hostname === 'localhost' ? 'http://localhost:5001/api' : '/api';

// const API_BASE_URL = window.location.hostname === 'localhost'
//   ? 'http://localhost:5001/api'
//   : window.location.hostname.includes('replit')
//     ? `${window.location.protocol}//${window.location.hostname}/api`
//     : `${window.location.protocol}//${window.location.hostname}:5001/api`;

interface DashboardData {
  stats: any;
  projects: any[];
  invoices: any[];
  supportTickets: any[];
  notifications: any[];
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

class DashboardApiService {
  private async fetchWithAuth(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const token = authUtils.getToken();

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      authUtils.logout();
      window.dispatchEvent(new Event('auth-changed'));
      throw new Error('Authentication required');
    }

    return response;
  }

  async getDashboardData(): Promise<DashboardData> {
    try {
      const response = await this.fetchWithAuth('/dashboard');

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result: ApiResponse<DashboardData> = await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.message || 'Failed to fetch dashboard data');
      }

      return result.data;
    } catch (error: any) {
      console.error('Dashboard API Error:', error);
      // Return fallback data structure to prevent UI crashes
      if (error.message === 'Authentication required') {
        throw error;
      }
      throw new Error(error.message || 'Network error - please check your connection');
    }
  }

  async getProjects(
    params: {
      status?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<{ projects: any[]; total: number; hasMore: boolean }> {
    try {
      const queryParams = new URLSearchParams();
      if (params.status) queryParams.append('status', params.status);
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.offset) queryParams.append('offset', params.offset.toString());

      const response = await this.fetchWithAuth(`/dashboard/projects?${queryParams}`);
      const result: ApiResponse<{ projects: any[]; total: number; hasMore: boolean }> =
        await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.message || 'Failed to fetch projects');
      }

      return result.data;
    } catch (error) {
      console.error('Projects API Error:', error);
      throw error;
    }
  }

  async getInvoices(
    params: {
      status?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<{ invoices: any[]; total: number; hasMore: boolean }> {
    try {
      const queryParams = new URLSearchParams();
      if (params.status) queryParams.append('status', params.status);
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.offset) queryParams.append('offset', params.offset.toString());

      const response = await this.fetchWithAuth(`/dashboard/invoices?${queryParams}`);
      const result: ApiResponse<{ invoices: any[]; total: number; hasMore: boolean }> =
        await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.message || 'Failed to fetch invoices');
      }

      return result.data;
    } catch (error) {
      console.error('Invoices API Error:', error);
      throw error;
    }
  }

  async getSupportTickets(
    params: {
      status?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<{ tickets: any[]; total: number; hasMore: boolean }> {
    try {
      const queryParams = new URLSearchParams();
      if (params.status) queryParams.append('status', params.status);
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.offset) queryParams.append('offset', params.offset.toString());

      const response = await this.fetchWithAuth(`/dashboard/support?${queryParams}`);
      const result: ApiResponse<{ tickets: any[]; total: number; hasMore: boolean }> =
        await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.message || 'Failed to fetch support tickets');
      }

      return result.data;
    } catch (error) {
      console.error('Support Tickets API Error:', error);
      throw error;
    }
  }

  async getAnalytics(period: number = 30): Promise<{
    analytics: any[];
    trends: any;
    period: number;
  }> {
    try {
      const response = await this.fetchWithAuth(`/dashboard/analytics?period=${period}`);
      const result: ApiResponse<{
        analytics: any[];
        trends: any;
        period: number;
      }> = await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.message || 'Failed to fetch analytics');
      }

      return result.data;
    } catch (error) {
      console.error('Analytics API Error:', error);
      throw error;
    }
  }
}

export const dashboardApi = new DashboardApiService();
