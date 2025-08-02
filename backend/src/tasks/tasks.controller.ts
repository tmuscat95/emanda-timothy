import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('top-level')
  findAllTopLevel() {
    return this.tasksService.findAllTopLevel();
  }

  @Get(':id/subtasks')
  findSubtasks(@Param('id') id: number) {
    return this.tasksService.findSubtasks(id);
  }

}
