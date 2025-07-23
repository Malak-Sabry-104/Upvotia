import api from './api';
import type { User, Wish, Project, Boost, Comment, PaginatedResponse } from '../types';

export const profileService = {
  async getUserProfile(userId: number): Promise<User> {
    const response = await api.get(`/users/profile/${userId}/`);
    return response.data;
  },

  async getCurrentProfile(): Promise<User> {
    const response = await api.get('/users/profile/');
    return response.data;
  },

  async updateProfile(profileData: FormData): Promise<User> {
    const response = await api.put('/users/profile/update/', profileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getUserWishes(userId: number, page?: number): Promise<PaginatedResponse<Wish>> {
    const params = new URLSearchParams({
      user: userId.toString(),
    });
    if (page) params.append('page', page.toString());

    const response = await api.get(`/wishes/?${params}`);
    return response.data;
  },

  async getUserProjects(userId: number, page?: number): Promise<PaginatedResponse<Project>> {
    const params = new URLSearchParams({
      user: userId.toString(),
    });
    if (page) params.append('page', page.toString());

    const response = await api.get(`/projects/?${params}`);
    return response.data;
  },

  async getUserBoosts(userId: number, page?: number): Promise<PaginatedResponse<Boost>> {
    const params = new URLSearchParams({
      user: userId.toString(),
    });
    if (page) params.append('page', page.toString());

    const response = await api.get(`/boosts/?${params}`);
    return response.data;
  },

  async getUserComments(userId: number, page?: number): Promise<PaginatedResponse<Comment>> {
    const params = new URLSearchParams({
      user: userId.toString(),
    });
    if (page) params.append('page', page.toString());

    const response = await api.get(`/comments/?${params}`);
    return response.data;
  },

  async getUserUpvotes(userId: number, page?: number): Promise<PaginatedResponse<unknown>> {
    const params = new URLSearchParams({
      user: userId.toString(),
    });
    if (page) params.append('page', page.toString());

    const response = await api.get(`/upvotes/?${params}`);
    return response.data;
  },
};