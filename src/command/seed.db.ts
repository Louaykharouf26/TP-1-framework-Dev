/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SkillService } from '../skill/skill.service';
import { skill } from '../skill/entities/skill.entity';
import {user} from '../user/entities/user.entity';
import { randEmail, randFilePath, randFirstName, randJobTitle, randLastName, randNumber, randPassword, randSkill, randUserName } from '@ngneat/falso';
import { cv } from '../cv/entities/cv.entity';
import { CvService } from '../cv/cv.service';
import { UserService } from '../user/user.service';
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // Todo :  Do What you want
  const skillService = app.get(SkillService);
  for (let i = 0; i < 50; i++) {
    const Skill = new skill();
    Skill.designation = randSkill();
    await skillService.create(Skill);
  }
  for (let i = 0; i < 10; i++) {
    const User = new user();
    User.username = randUserName();
    User.email = randEmail();
    User.password = randPassword();
    await UserService.create(user);
  
  }
  for (let i = 0; i < 10; i++) {
    const Cv = new cv();
    Cv.Age = randNumber({ min: 18, max: 100 });
    Cv.Cin = randNumber({ min: 1000, max: 9999 });
    Cv.Job = randJobTitle();
    Cv.firstname = randFirstName();
    Cv.name = randLastName();
    Cv.path = randFilePath();
    await CvService.create(Cv);
  }
  await app.close();
}

bootstrap();
