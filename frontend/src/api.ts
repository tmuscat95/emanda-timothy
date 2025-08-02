import axios from "axios";
import { Task } from "./types";

const API_BASE = "/api/tasks";

export default class API {
  private static async fetch(
    url: string,
    method: "get" | "post" | "put" | "delete",
    data?: any,
  ): Promise<any> {
    try {
      const options = {
        method,
        url,
        data,
      };
      const res = await axios.request(options);
      return res.data ?? [];
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  static async fetchSubtasks(taskId: number): Promise<Task[]> {
    return this.fetch(`${API_BASE}/${taskId}/subtasks`, "get");
  }

  static async fetchTopLevelTasks(): Promise<Task[]> {
    return this.fetch(`${API_BASE}/top-level`, "get");
  }

  static async createTask(title: string, parentId?: number): Promise<Task> {
    return this.fetch(API_BASE, "post", { title, parentId });
  }

  static async fetchAllTasks(): Promise<Task[]> {
    return this.fetch(API_BASE, "get");
  }
}

// export const fetchAllTasks = async (): Promise<Task[]> => {
//     const res = await axios.get(API_BASE);
//     return res.data ?? [];
//   };

// export const fetchSubtasks = async (taskId: number): Promise<Task[]> => {
//   const res = await axios.get(`${API_BASE}/${taskId}/subtasks`);
//   return res.data ?? [];
// };

// export const fetchTopLevelTasks = async (): Promise<Task[]> => {
//   const res = await axios.get(`${API_BASE}/top-level`);
//   return res.data ?? [];
// }

// export const createTask = async (title: string, parentId?: number): Promise<Task> => {
//   const res = await axios.post(API_BASE, { title, parentId });
//   return res.data;
// };
