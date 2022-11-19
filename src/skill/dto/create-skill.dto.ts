import {
  IsNotEmpty,
  MinLength,
  ValidationArguments,
  MaxLength,
} from 'class-validator';
import { v4 as Id } from 'uuid';
export class CreateSkillDto {
  id = Id();
  @IsNotEmpty()
  @MinLength(10, { message: 'taille minimum 10' })
  designation: string;
}
