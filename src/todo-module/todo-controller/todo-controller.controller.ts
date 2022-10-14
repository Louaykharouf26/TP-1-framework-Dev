import { Body, Controller, Get, NotFoundException, Post, ValidationPipe } from '@nestjs/common';
import { Delete, Param, Put, Query, UsePipes } from '@nestjs/common/decorators';
import { TodoModel } from '../todo-model';
import {createDTO} from './dto/create.dto';
import { TodoDto } from './dto/todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
@Controller('todo-controller')
export class TodoControllerController {
  private todos: TodoModel[] = [];

  @Get()
  getTodos(): TodoModel[] {
    return this.todos;
  }
  @Post('add')
  @UsePipes(ValidationPipe)
  setTodos(@Body() createDTO: createDTO) {
    const todo = new TodoModel();
    todo.name = createDTO.name;
    todo.description = createDTO.description;
    this.todos.push(todo);
    return todo;
  }
  @Get('ById/:id')
  findbyId(@Param() id: string): TodoModel {
    return this.findtodo(id);
  }
  @Delete('delete/:id')
  deletebyId(@Param() id: string): string {
    const todo = this.findtodo(id);
    this.todos = this.todos.filter((todo) => todo.id != id);
    return 'deleted';
  }
  @Put('modify/:id')
  @UsePipes(ValidationPipe)
  modifybyId(id: string, body: UpdateTodoDto): TodoModel {
    const todo = this.findtodo(id)
    if (body.name) {todo.name = body.name;
      this.todos.push(todo);
    }
    if (todo.description) todo.description = body.description;
    if (todo.statut) todo.statut = body.statut;
    
    return todo;
}

  findtodo(id: string): TodoModel {
    const todo1 = this.todos.find((todo) => todo.id == id);
    if (!todo1) throw new NotFoundException();
    return todo1;
  }
}
