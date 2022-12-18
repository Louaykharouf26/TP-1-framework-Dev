import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { user } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(user)
    private todoRepository: Repository<user>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<user> {
    return await this.todoRepository.save(createUserDto);
    //return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
