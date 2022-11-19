/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SkillService } from '../skill/skill.service';
import { skill } from '../skill/entities/skill.entity';
import {user} from '../user/entities/user.entity';
import { randSkill } from '@ngneat/falso';
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // Todo :  Do What you want
  const skillService = app.get(SkillService);
  for (let i = 0; i < 50; i++) {
    const Skill = new skill();
    Skill.designation = randSkill();
    await skillService.create(Skill);
  }
  await app.close();
}

bootstrap();
