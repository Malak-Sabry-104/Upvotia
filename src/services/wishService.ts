import api from './api';
import { type Wish, type WishFormData, type PaginatedResponse } from '../types';

export const wishService = {
  async getWishes(params?: {
    tool?: string;
    category?: string;
    search?: string;
    sort?: string;
    page?: number;
  }): Promise<PaginatedResponse<Wish>> {
    const response = await api.get('/wishes/', { params });
    return response.data;
  },

  async getWish(id: number): Promise<Wish> {
    const response = await api.get(`/wishes/${id}/`);
    return response.data;
  },

  async createWish(wishData: WishFormData): Promise<Wish> {
    const formData = new FormData();
    
    formData.append('title', wishData.title);
    formData.append('tool_app_name', wishData.tool_app_name);
    formData.append('description', wishData.description);
    formData.append('categories', wishData.categories);
    formData.append('pledge_amount', wishData.pledge_amount.toString());
    
    if (wishData.image) {
      formData.append('image', wishData.image);
    }

    const response = await api.post('/wishes/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async updateWish(id: number, wishData: Partial<WishFormData>): Promise<Wish> {
    const formData = new FormData();
    
    Object.entries(wishData).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'image' && value instanceof File) {
          formData.append(key, value);
        } else if (key !== 'image') {
          formData.append(key, value.toString());
        }
      }
    });

    const response = await api.put(`/wishes/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteWish(id: number): Promise<void> {
    await api.delete(`/wishes/${id}/`);
  },

  async toggleUpvote(id: number): Promise<unknown> {
    const response = await api.post(`/wishes/${id}/upvote/`);
    return response.data;
  },
};