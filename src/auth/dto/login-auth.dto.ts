import { IsNotEmpty, IsOptional, IsString, Length } from "@nestjs/class-validator";
import { OmitType } from "@nestjs/mapped-types";
import { UserEntity } from "src/users/entities/user.entity";

export class LoginDto extends OmitType(UserEntity, []) {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsOptional()
    @IsNotEmpty()
    @Length(6)
    password: string;
}