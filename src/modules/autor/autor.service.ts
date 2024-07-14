import { Injectable } from '@nestjs/common';
import { AutorType } from '../types/types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AutorService {
  constructor(private prisma: PrismaService) {}

  async create(data: AutorType) {
    const autor = await this.prisma.autor.create({ data });
    return autor;
  }

  async findAll() {
    return await this.prisma.autor.findMany();
  }

  async findOne(id: number) {
    const errorId = await this.prisma.autor.findFirst({ where: { id: id } });

    if (!errorId) {
      throw new Error('Id não encontrado');
    }
    return await this.prisma.autor.findUnique({ where: { id: id } });
  }

  async update(id: number, data: AutorType) {
    const errorId = await this.prisma.autor.findFirst({ where: { id: id } });

    if (!errorId) {
      throw new Error('Id não encontrado');
    }
    return await this.prisma.autor.update({
      where: { id: id },
      data: { ...data },
    });
  }

  async remove(id: number) {
    const errorId = await this.prisma.autor.findFirst({ where: { id: id } });

    if (!errorId) {
      throw new Error('Id não encontrado');
    }
    return await this.prisma.autor.delete({ where: { id: id } });
  }
}
