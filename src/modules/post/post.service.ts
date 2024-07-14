import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostTypes } from '../types/types';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(data: PostTypes) {
    const post = await this.prisma.post.create({ data });
    return post;
  }

  async findAll() {
    return await this.prisma.post.findMany({
      include: { categoria: { include: {} }, autor: { include: {} } },
    });
  }

  async findOne(id: number) {
    const errorId = await this.prisma.post.findFirst({
      where: { id: id },
      include: { autor: true },
    });

    if (!errorId) {
      throw new Error('Id não encontrado');
    }
    return await this.prisma.post.findUnique({ where: { id: id } });
  }

  async update(id: number, data: PostTypes) {
    const errorId = await this.prisma.post.findFirst({ where: { id: id } });

    if (!errorId) {
      throw new Error('Id não encontrado');
    }
    return await this.prisma.post.update({
      where: { id: id },
      data: { ...data },
    });
  }

  async remove(id: number) {
    const errorId = await this.prisma.post.findFirst({ where: { id: id } });

    if (!errorId) {
      throw new Error('Id não encontrado');
    }
    return await this.prisma.post.delete({ where: { id: id } });
  }
}
