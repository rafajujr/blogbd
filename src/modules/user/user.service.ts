import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserTypes } from '../types/types';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserTypes) {
    const user = await this.prisma.user.create({ data });
    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const errorId = await this.prisma.user.findFirst({ where: { id: id } });

    if (!errorId) {
      throw new Error('Id não encontrado');
    }
    return await this.prisma.user.findUnique({ where: { id: id } });
  }

  async update(id: number, data: UserTypes) {
    const errorId = await this.prisma.user.findFirst({ where: { id: id } });

    if (!errorId) {
      throw new Error('Id não encontrado');
    }
    return await this.prisma.user.update({
      where: { id: id },
      data: { ...data },
    });
  }

  async remove(id: number) {
    const errorId = await this.prisma.user.findFirst({ where: { id: id } });

    if (!errorId) {
      throw new Error('Id não encontrado');
    }
    return await this.prisma.user.delete({ where: { id: id } });
  }
}
