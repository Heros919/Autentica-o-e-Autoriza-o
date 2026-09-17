import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AprovarSolicitacaoDto } from './dto/aprovar-solicitacao.dto';
import { CriarSolicitacaoDto } from './dto/criar-solicitacao.dto';
import { FiltrarSolicitacoesDto } from './dto/filtrar-solicitacoes.dto';
import { RejeitarSolicitacaoDto } from './dto/rejeitar-solicitacao.dto';
import { SolicitacoesService } from './solicitacoes.service';

type RequisicaoAutenticada = {
  user: { id: number; papel: string };
};

@Controller('solicitacoes')
export class SolicitacoesController {
  constructor(private readonly service: SolicitacoesService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.service.buscarPorId(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('gestor')
  @Patch(':id/aprovar')
  aprovar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AprovarSolicitacaoDto,
    @Req() request: RequisicaoAutenticada,
  ) {
    return this.service.aprovar(id, dto.versao, request.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('gestor')
  @Patch(':id/rejeitar')
  rejeitar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RejeitarSolicitacaoDto,
    @Req() request: RequisicaoAutenticada,
  ) {
    return this.service.rejeitar(id, dto, request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  criar(@Body() dto: CriarSolicitacaoDto) {
    return this.service.criar(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  listar(@Query() filtros: FiltrarSolicitacoesDto) {
    return this.service.listar(filtros);
  }
}