import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {IsNull, Repository} from 'typeorm';
import { Task } from './entities/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDTO } from 'src/types';

function toTaskDTO(task: Task): TaskDTO {
  return {
    id: task.id,
    title: task.title,
    parentId: task.parent ? task.parent.id : undefined,
    subtaskIds: task.subtasks ? task.subtasks.map(subtask => subtask.id) : []
  };
}

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRepo: Repository<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.title = createTaskDto.title;
    if (createTaskDto.parentId) {
      task.parent = (await this.tasksRepo.findOneBy({ id: createTaskDto.parentId })) ?? undefined;
    }
    
    return this.tasksRepo.save(task);
  }

  async findAll(): Promise<TaskDTO[]> {
    const tasks = await this.tasksRepo.find({ relations: ['subtasks', 'parent'] });
    return tasks.map(toTaskDTO);
       
  }

  async findAllTopLevel(): Promise<TaskDTO[]> {
    const tasks = await this.tasksRepo.find({ where: { parent: IsNull() }, relations: ['parent'] });
    return tasks.map(toTaskDTO);
    }
  

  async findSubtasks(id: number): Promise<TaskDTO[]> {
    const task = await this.tasksRepo.findOne({ where: { id }, relations: ['subtasks'] });

    if (!task) return [];

    return task.subtasks.map(toTaskDTO);

    // // this works too, looks a bit cleaner but less efficient.
    return this.tasksRepo.find({ where: { parent: { id } } });
  }
}
