// User types
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  profile: UserProfile;
}

export interface UserProfile {
  bio: string;
  avatar: string | null;
  user_type: 'user' | 'dev';
  github_url: string;
  twitter_url: string;
  created_at: string;
  updated_at: string;
}

// Wish types
export interface Wish {
  id: number;
  user: User;
  title: string;
  tool_app_name: string;
  description: string;
  categories: string;
  categories_list: string[];
  pledge_amount: string;
  image: string | null;
  created_at: string;
  upvotes_count: number;
  total_funding: string;
}

// Project types
export interface Project {
  id: number;
  user: User;
  title: string;
  tool_app_name: string;
  description: string;
  github_repo: string;
  demo_link: string;
  tutorial_link: string;
  technologies: string;
  technologies_list: string[];
  hours_worked: number;
  status: 'in_dev' | 'ready' | 'shipped';
  image: string | null;
  upvotes_count: number;
  total_funding: string;
  created_at: string;
  updated_at: string;
  updates: ProjectUpdate[];
}

export interface ProjectUpdate {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

// Upvote types
export interface Upvote {
  id: number;
  user: User;
  content_type: number;
  object_id: number;
  target_title: string;
  created_at: string;
}

// Boost types
export interface Boost {
  id: number;
  user: User;
  amount: string;
  message: string;
  target_title: string;
  content_type: number;
  object_id: number;
  created_at: string;
}

// Comment types
export interface Comment {
  id: number;
  user: User;
  content: string;
  parent: number | null;
  replies: Comment[];
  content_type: number;
  object_id: number;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Auth types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

// Form types
export interface WishFormData {
  title: string;
  tool_app_name: string;
  description: string;
  categories: string;
  pledge_amount: number;
  image?: File;
}

export interface ProjectFormData {
  title: string;
  tool_app_name: string;
  description: string;
  github_repo: string;
  demo_link: string;
  tutorial_link: string;
  technologies: string;
  hours_worked: number;
  status: 'in_dev' | 'ready';
  image?: File;
}