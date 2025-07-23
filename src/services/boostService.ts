import api from './api';
import type { Boost, PaginatedResponse } from '../types';

export const boostService = {
  async getBoosts(): Promise<PaginatedResponse<Boost>> {
    const response = await api.get('/boosts/');
    return response.data;
  },

  async boostWish(wishId: number, amount: number, message?: string): Promise<Boost> {
    const response = await api.post('/boosts/create/', {
      app_label: 'wishes',
      model_name: 'wish',
      object_id: wishId,
      amount: amount.toString(),
      message: message || '',
    });
    return response.data;
  },

  async boostProject(projectId: number, amount: number, message?: string): Promise<Boost> {
    const response = await api.post('/boosts/create/', {
      app_label: 'projects',
      model_name: 'project',
      object_id: projectId,
      amount: amount.toString(),
      message: message || '',
    });
    return response.data;
  },
};