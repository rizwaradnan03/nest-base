import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "@nestjs/class-validator";
import { OmitType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto extends OmitType(UserEntity, ['id']) {
  @IsNotEmpty()
  username: string;

  @Length(6)
  @IsNotEmpty()
  password: string;
}
