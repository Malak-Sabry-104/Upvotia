import api from './api';
import { type LoginCredentials, type RegisterData, type TokenResponse, type User } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<TokenResponse> {
    const response = await api.post('/auth/token/', credentials);
    const tokens = response.data;
    
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
    
    return tokens;
  },

  async register(userData: RegisterData): Promise<User> {
    const response = await api.post('/users/register/', userData);
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/users/profile/');
    return response.data;
  },

  async updateProfile(profileData: Partial<User>): Promise<User> {
    const response = await api.put('/users/profile/', profileData);
    return response.data;
  },

  async updateUserProfile(profileData: FormData): Promise<any> {
    const response = await api.put('/users/profile/update/', profileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getUserProfile(userId: number): Promise<User> {
    const response = await api.get(`/users/profile/${userId}/`);
    return response.data;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },
};