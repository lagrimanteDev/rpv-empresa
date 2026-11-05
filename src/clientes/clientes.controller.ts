import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ClientesService } from './clientes.service.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';
import { EmpresaId } from '../common/empresa-id.decorator.js';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) { }

  @Post()
  create(@EmpresaId() empresaId: number, @Body() dto: CreateClienteDto) {
    return this.clientesService.create(empresaId, dto)
  }

  @Get()
  findAll(@EmpresaId() empresaId: number) {
    return this.clientesService.findAll(empresaId);
  }

  @Get(':id')
  findOne(@EmpresaId() empresaId: number, @Param('id', ParseIntPipe) id: number) {
    return this.clientesService.findOne(empresaId, id);
  }

  @Patch(':id')
  update(@EmpresaId() empresaId: number, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateClienteDto) 
    return this.clientesService.update(empresaId, id, dto);{
  }

  @Delete(':id')
  remove() {
  }
}
