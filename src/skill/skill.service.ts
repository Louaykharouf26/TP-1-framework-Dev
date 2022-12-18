import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { skill } from './entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(skill)
    private skillRepository: Repository<skill>,
  ) {}

  create(createSkillDto: CreateSkillDto): Promise<skill> {
    return this.skillRepository.save(createSkillDto);
    //return 'This action adds a new skill';
  }

  findAll(): Promise<skill[]> {
    return this.skillRepository.find();
    //return `This action returns all skill`;
  }

  async findOne(id: number): Promise<skill> {
    const Skill = await this.skillRepository.findOneBy({ id: id });
    if (!Skill) {
      throw new NotFoundException();
    }
    return Skill;
    //return  `This action returns a #${id} skill`;
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    const newSkill = await this.skillRepository.preload({
      id,
      ...updateSkillDto,
    });
    if (!newSkill) throw new NotFoundException();
    return await this.skillRepository.save(newSkill);
    //return `This action updates a #${id} skill`;
  }

  async remove(id: number) {
    const result = await this.skillRepository.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException();
    }
    return result;
    //  return `This action removes a #${id} skill`;
  }
}
