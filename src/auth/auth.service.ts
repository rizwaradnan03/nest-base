import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) { }

    async register(createUserDto: CreateUserDto) {
        
        const isUsernameValid = await this.prisma.user.findFirst({
            where:{
                username: createUserDto.username
            }
        })

        if(isUsernameValid){
            return new UnauthorizedException("username already exist")
        }

        if (createUserDto.password.length == null) {
            return new UnauthorizedException("password does not require for that length")
        }

        if (createUserDto.password.length < 6) {
            return new UnauthorizedException('Password less than 6 characters')
        }

        const hashPassword = await bcrypt.hash(createUserDto.password, 10)

        try {
            const user = await this.prisma.user.create({
                data: {
                    ...createUserDto,
                    password: hashPassword
                }
                
            })

            return { user }

        } catch (error) {
            console.error("Terjadi kesalahan saat membuat user atau customer:", error);
            throw error;
        }
    }

    async validateUser(loginDto: LoginDto) {
        const isUserValid = await this.prisma.user.findFirst({
            where: { username: loginDto.username }
        })

        if (!isUserValid) {
            throw new NotFoundException(`No user found for username: ${loginDto.username}`);
        }

        const isPasswordValid = await bcrypt.compare(
            loginDto.password, isUserValid.password
        )

        if (loginDto.password.length < 6) {
            throw new UnauthorizedException('Password less than 6 characters');
        }

        if (!isPasswordValid) {
            throw new UnauthorizedException('Wrong Password');
        }

        const payload = { sub: isUserValid.id, name: isUserValid.username};

        return { token: this.jwt.sign(payload) }
    }



    async login(loginDto: LoginDto) {
        const isUserValid = await this.prisma.user.findFirst({
            where: { username: loginDto.username }
        })

        const payload = { sub: isUserValid.id, username: isUserValid.username};

        return { token: this.jwt.sign(payload) }
    }

}