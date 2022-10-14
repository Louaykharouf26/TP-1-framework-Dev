import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { TodoModel } from 'src/todo-module/todo-model';
import { createDTO } from 'src/todo-module/todo-controller/dto/create.dto';

@Injectable()
export class TodoServiceService {
    private todos: TodoModel[] = [];
    findtodo(id: string): TodoModel {
        const todo1 = this.todos.find((todo) => todo.id == id);
        if (!todo1) throw new NotFoundException();
        return todo1;
      }
      getTodos(): TodoModel[] {
        return this.todos;
      }
      setTodos(@Body() createDTO: createDTO) {
        const todo = new TodoModel();
        todo.name = createDTO.name;
        todo.description = createDTO.description;
        this.todos.push(todo);
        return todo;
      }
      findbyId(@Param() id: string): TodoModel {
        return this.findtodo(id);
      }
      
}
