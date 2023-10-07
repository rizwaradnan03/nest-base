import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return await this.prisma.user.findMany({
    });
  }

  async findAllIsActive() {
    return await this.prisma.user.findMany({
    });
  }

  async findAllNotActive() {
    return await this.prisma.user.findMany({
    });
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: {id}
    })
  }
}