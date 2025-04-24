import axios from 'axios';
import { apiClient } from './api-Client.ts';
import {create} from 'zustand';

export interface User {
  id: number;
  title: string;
  body: string;
}

interface UserState {
  users: User[];
  error: string | null;
  loading: boolean;
  length: number;
  getUsers: (controller: AbortController) => Promise<void>;
  postUser: (user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  updateUser: (id: number) => Promise<void>;
}

const useUserStore = create<UserState>((set, get) => ({
  users: [],
  error: null,
  loading: false,
  length: 0,

  getUsers: async (controller: AbortController) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.get<User[]>('/posts', {
        signal: controller.signal,
      });
      set({ users: response.data, loading: false , length: response.data.length });
    } catch (err: any) {
      if (!axios.isCancel(err)) {
        console.error(err);
        set({ error: err.message, loading: false });
      }
    }
  },

  postUser: async (user: User) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/posts', user);
      set({ users: [response.data, ...get().users], loading: false });
      set({ length: get().users.length });
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error(error);
        set({ error: (error as Error).message, loading: false });
      }
    }
  },

  deleteUser: async (id: number) => {
    const originalUsers = get().users;
    set({ users: originalUsers.filter((user) => user.id !== id) , length: get().users.length });
    try {
      await apiClient.delete(`/posts/${id}`);
    } catch (err: any) {
      if (!axios.isCancel(err)) {
        console.error(err.message);
        set({ users: originalUsers });
      }
    }
  },

  updateUser: async (id: number) => {
    const originalUsers = get().users;
    const updatedUsers = originalUsers.map((user) =>
      user.id === id ? { ...user, body: `${user.body} updated` } : user
    );
    set({ users: updatedUsers , length: get().users.length });
    try {
      await apiClient.put(`/posts/${id}`, updatedUsers);
    } catch (err: any) {
      console.error(err.message);
      set({ users: originalUsers });
    }
  },
}));

export default useUserStore;
