import api from './api';
import type { Comment, PaginatedResponse } from '../types';

export const commentService = {
  async getComments(contentType: number, objectId: number): Promise<PaginatedResponse<Comment>> {
    const response = await api.get('/comments/', {
      params: {
        content_type: contentType,
        object_id: objectId,
      },
    });
    return response.data;
  },

  async commentOnWish(wishId: number, content: string, parentId?: number): Promise<Comment> {
    const response = await api.post('/comments/create/', {
      app_label: 'wishes',
      model_name: 'wish',
      object_id: wishId,
      content,
      parent: parentId || null,
    });
    return response.data;
  },

  async commentOnProject(projectId: number, content: string, parentId?: number): Promise<Comment> {
    const response = await api.post('/comments/create/', {
      app_label: 'projects',
      model_name: 'project',
      object_id: projectId,
      content,
      parent: parentId || null,
    });
    return response.data;
  },

  async updateComment(id: number, content: string): Promise<Comment> {
    const response = await api.put(`/comments/${id}/`, { content });
    return response.data;
  },

  async deleteComment(id: number): Promise<void> {
    await api.delete(`/comments/${id}/`);
  },
};