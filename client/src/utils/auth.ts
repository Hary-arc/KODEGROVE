
export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  createdAt: string
}

export const authUtils = {
  // Get stored token
  getToken(): string | null {
    return localStorage.getItem('auth-token')
  },

  // Get stored user data
  getUser(): User | null {
    const userData = localStorage.getItem('user-data')
    return userData ? JSON.parse(userData) : null
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken()
    const user = this.getUser()
    return !!(token && user)
  },

  // Logout user
  logout(): void {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user-data')
    window.location.hash = '/'
  },

  // Make authenticated API requests
  async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const token = this.getToken()
    
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(token && { Authorization: `Bearer ${token}` })
    }

    return fetch(url, {
      ...options,
      headers
    })
  }
}
