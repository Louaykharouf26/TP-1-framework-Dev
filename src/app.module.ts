import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './premier/premier.module';
import { TodoModuleModule } from './todo-module/todo-module.module';
//import { TodoServiceService } from './todo-service/todo-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entity/TodoEntity.entity';
import { TodoServiceService } from './todo-service/todo-service.service';

@Module({
  imports: [
    PremierModule,
    TodoModuleModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'tp',
      entities: [TodoEntity],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TodoServiceService],
})
export class AppModule {}
