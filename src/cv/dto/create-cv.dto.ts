import {
  IsNotEmpty,
  MinLength,
  ValidationArguments,
  MaxLength,
} from 'class-validator';
import { v4 as Id } from 'uuid';
export class CreateCvDto {
  id = Id();
  @IsNotEmpty()
  @MinLength(10, { message: 'taille minimum 10' })
  name: string;

  @MinLength(3)
  @MaxLength(10)
  @IsNotEmpty()
  firstname: string;
  age: number;
  @MinLength(3)
  @MaxLength(10)
  @IsNotEmpty()
  Cin: string;
  @MinLength(3)
  @MaxLength(10)
  @IsNotEmpty()
  job: string;
  @MinLength(3)
  @MaxLength(10)
  @IsNotEmpty()
  path: string;
}
