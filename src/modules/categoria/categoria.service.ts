import { Injectable } from '@nestjs/common';
import { CategoriaTypes } from '../types/types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CategoriaTypes) {
    const categoria = await this.prisma.categoria.create({ data });
    return categoria;
  }

  async findAll() {
    return await this.prisma.categoria.findMany();
  }

  async findOne(id: number) {
    const errorId = await this.prisma.categoria.findFirst({
      where: { id: id },
    });

    if (!errorId) {
      throw new Error('Id não encontrado');
    }
    return await this.prisma.categoria.findUnique({ where: { id: id } });
  }

  async update(id: number, data: CategoriaTypes) {
    const errorId = await this.prisma.categoria.findFirst({
      where: { id: id },
    });

    if (!errorId) {
      throw new Error('Id não encontrado');
    }
    return await this.prisma.categoria.update({
      where: { id: id },
      data: { ...data },
    });
  }

  async remove(id: number) {
    const errorId = await this.prisma.categoria.findFirst({
      where: { id: id },
    });

    if (!errorId) {
      throw new Error('Id não encontrado');
    }
    return await this.prisma.categoria.delete({ where: { id: id } });
  }
}
