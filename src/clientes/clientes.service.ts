import { ConflictException, Injectable, ParseIntPipe } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { EmpresasService } from '../empresas/empresas.service.js';

@Injectable()
export class ClientesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly empresas: EmpresasService
  ) { }

  async create(empresaId: number, dto: CreateClienteDto) {
    await this.empresas.validarEmpresaAtiva(empresaId);
    await this.validaTelefoneDisponivel(empresaId, dto.telefone);

    return this.prisma.cliente.create({
      data: { ...dto, empresaId }
    })

  }

  findAll(clientesEmpresaId: number) {
    return this.prisma.cliente.findMany({ where: { empresaId: clientesEmpresaId }, orderBy: { nome: `asc` } });
  }

  findOne(empresaId: number, id: number) {
    return this.prisma.cliente.findUnique({ where: { empresaId: empresaId, id} });
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {return 
    return this.prisma.cliente.findUnique({where: {id}});
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }

  private async validaTelefoneDisponivel(
    empresaId: number,
    telefone: string,
    ignorarId?: number
  ) {
    const existe = await this.prisma.cliente.findUnique({
      where: { empresaId_telefone: { empresaId, telefone } }
    })

    if (existe && existe.id !== ignorarId) {
      throw new ConflictException('Telefone já cadastrado nesta empresa')
    }
  }
}
