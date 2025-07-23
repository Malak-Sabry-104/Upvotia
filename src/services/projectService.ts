import api from './api';
import type { Project, ProjectFormData, ProjectUpdate, PaginatedResponse } from '../types';

export const projectService = {
  async getProjects(params?: {
    tool?: string;
    status?: string;
    search?: string;
    page?: number;
  }): Promise<PaginatedResponse<Project>> {
    const response = await api.get('/projects/', { params });
    return response.data;
  },

  async getProject(id: number): Promise<Project> {
    const response = await api.get(`/projects/${id}/`);
    return response.data;
  },

  async createProject(projectData: ProjectFormData): Promise<Project> {
    const formData = new FormData();
    
    formData.append('title', projectData.title);
    formData.append('tool_app_name', projectData.tool_app_name);
    formData.append('description', projectData.description);
    formData.append('github_repo', projectData.github_repo);
    formData.append('demo_link', projectData.demo_link);
    formData.append('tutorial_link', projectData.tutorial_link);
    formData.append('technologies', projectData.technologies);
    formData.append('hours_worked', projectData.hours_worked.toString());
    formData.append('status', projectData.status);
    
    if (projectData.image) {
      formData.append('image', projectData.image);
    }

    const response = await api.post('/projects/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async updateProject(id: number, projectData: Partial<ProjectFormData>): Promise<Project> {
    const formData = new FormData();
    
    Object.entries(projectData).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'image' && value instanceof File) {
          formData.append(key, value);
        } else if (key !== 'image') {
          formData.append(key, value.toString());
        }
      }
    });

    const response = await api.put(`/projects/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteProject(id: number): Promise<void> {
    await api.delete(`/projects/${id}/`);
  },

  async toggleUpvote(id: number): Promise<unknown> {
    const response = await api.post(`/projects/${id}/upvote/`);
    return response.data;
  },

  async addUpdate(id: number, updateData: { title: string; description: string }): Promise<ProjectUpdate> {
    const response = await api.post(`/projects/${id}/add_update/`, updateData);
    return response.data;
  },
};