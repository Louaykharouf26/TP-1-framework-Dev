import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './premier/premier.module';
import { TodoModuleModule } from './todo-module/todo-module.module';
//import { TodoServiceService } from './todo-service/todo-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entity/TodoEntity.entity';
import { TodoServiceService } from './todo-service/todo-service.service';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';

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
      database: 'bdseed',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),

    CvModule,
    SkillModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
