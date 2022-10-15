import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { TodoModel } from 'src/todo-module/todo-model';
import { createDTO } from 'src/todo-module/todo-controller/dto/create.dto';
import { UpdateTodoDto } from 'src/todo-module/todo-controller/dto/update-todo.dto';
import { Repository } from 'typeorm';
import { TodoEntity } from 'src/entity/TodoEntity.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
  setTodos(@Body() createDTO: createDTO): TodoModel {
    const todo = new TodoModel();
    todo.name = createDTO.name;
    todo.description = createDTO.description;
    this.todos.push(todo);
    return todo;
  }
  findbyId(@Param() id: string): TodoModel {
    return this.findtodo(id);
  }
  deleteTodo(id: string): string {
    const todo = this.findtodo(id);
    this.todos = this.todos.filter((todo) => todo.id != id);
    return 'todo deleted successfully';
  }
  modifybyId(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): TodoModel {
    const todo = this.findtodo(id);
    if (todo) {
      Object.assign(updateTodoDto, todo);
      this.todos.push(todo);
    }
    return todo;
  }
  constructor(
    @InjectRepository(TodoEntity)
    private sectionRepository: Repository<TodoEntity>,
  ) {}
  async addTodoBD(todo: createDTO): Promise<TodoEntity> {
    return await this.sectionRepository.save(todo);
  }
  async updateTodoBD(id: number, todo: UpdateTodoDto): Promise<TodoEntity> {
    const newTodo = await this.sectionRepository.preload({ id, ...todo });
    return await this.sectionRepository.save(newTodo);
  }
  async RemovefromBD(id: number): Promise<TodoEntity> {
    const entitytoremove = await this.sectionRepository.findOneById(id);
    if (!entitytoremove) {
      throw new NotFoundException("l'element de cet id n'existe pas ");
    }
    return await this.sectionRepository.remove(entitytoremove);
  }
  async softRemovefromBD(id: number): Promise<TodoEntity> {
    const entitytoremove = await this.sectionRepository.findOneById(id);
    if (!entitytoremove) {
      throw new NotFoundException("l'element de cet id n'existe pas ");
    }
    return await this.sectionRepository.softRemove(entitytoremove);
  }
  async RecoverTodo(id: number): Promise<TodoEntity> {
    const entitytorestore = await this.sectionRepository.findOneById(id);
   
    return await this.sectionRepository.recover(entitytorestore);
  }
}
