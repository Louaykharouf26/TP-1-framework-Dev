import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { Delete, Param, Put, Query } from '@nestjs/common/decorators';
import { TodoModel } from '../todo-model';
import { Status } from './Status';
import { TodoDto } from './dto/todo.dto';
import { UpdateTodoDto } from "./dto/update-todo.dto";
@Controller('todo-controller')
export class TodoControllerController {
  private todos: TodoModel[] = [];

  @Get()
  getTodos(): TodoModel[] {
    return this.todos;
  }
  @Post('add')
  setTodos(@Body() todoDto: TodoDto) {
    const todo = new TodoModel();
    todo.name = todoDto.name;
    todo.description = todoDto.description;
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
  modifybyId(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): TodoModel {
    const todo = this.findtodo(id);
    if (updateTodoDto.name) {
        todo.name = updateTodoDto.name;
      }
      if (updateTodoDto.description) {
        todo.description = updateTodoDto.description;
      }
      if (updateTodoDto.status) {
        todo.statut = updateTodoDto.status;
      }
      return todo;
  }

  findtodo(id: string): TodoModel {
    const todo1 = this.todos.find((todo) => todo.id == id);
    if (!todo1) throw new NotFoundException();
    return todo1;
  }
}
