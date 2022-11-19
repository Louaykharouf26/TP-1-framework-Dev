import {
  IsNotEmpty,
  MinLength,
  ValidationArguments,
  MaxLength,
} from 'class-validator';
import { v4 as Id } from 'uuid';
export class CreateUserDto {
  id = Id();
  @IsNotEmpty()
  @MinLength(10, { message: 'taille minimum 10' })
  username: string;

  @MinLength(3)
  @MaxLength(10)
  @IsNotEmpty()
  email: string;
  @MinLength(3)
  @MaxLength(10)
  @IsNotEmpty()
  password: string;
}
