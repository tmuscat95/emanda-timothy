import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task } from '../types';
import API from '../api';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, parentId?: number) => Promise<Task>;
  fetchSubtasks: (taskId: number) => Promise<Task[]>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    API.fetchTopLevelTasks().then(setTasks);
  }, []);

  const addTask = async (title: string, parentId?: number) : Promise<Task> => {
    const task = await API.createTask(title, parentId);
    if(!parentId){ 
      const topLevelTasks = await API.fetchTopLevelTasks();
      setTasks(topLevelTasks);
    }
    return task;
  };

  const fetchSubtasks = async (taskId: number) => {
    const subtasks = await API.fetchSubtasks(taskId);
    //setTasks((t : Task[])=>[...t.filter((task) => task.parentId !== taskId), ...subtasks])
    return subtasks;
  }

  return <TaskContext.Provider value={{ tasks, addTask, fetchSubtasks }}>{children}</TaskContext.Provider>;
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
};
