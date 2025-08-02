export interface TaskDTO {
  id: number;
  title: string;
  parentId?: number;
  subtaskIds?: number[];
}

export type Task = TaskDTO & {}; // possibly extend later ?
