import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty } from '@nestjs/class-validator';
import { UserEntity } from '../entities/user.entity';

export class UpdateUserDto extends OmitType(UserEntity, ['id']) {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    username: string
}
