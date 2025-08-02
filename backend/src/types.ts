export type TaskDTO = {
  id: number;
  title: string;
  parentId?: number;
  subtaskIds?: number[];
}