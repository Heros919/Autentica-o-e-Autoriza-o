import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnotacoesService } from './anotacoes.service';
import { CriarAnotacaoDto } from './dto/criar-anotacao.dto';
import { FiltrarAnotacoesDto } from './dto/filtrar-anotacoes.dto';

type RequisicaoAutenticada = {
  user: {
    id: number;
    papel: string;
  };
};

@UseGuards(JwtAuthGuard)
@Controller('solicitacoes/:solicitacaoId/anotacoes')
export class AnotacoesController {
  constructor(private readonly service: AnotacoesService) {}

  @Post()
  criar(
    @Param('solicitacaoId', ParseIntPipe) solicitacaoId: number,
    @Body() dto: CriarAnotacaoDto,
    @Req() request: RequisicaoAutenticada,
  ) {
    return this.service.criar(solicitacaoId, request.user.id, dto);
  }

  @Get()
  listar(
    @Param('solicitacaoId', ParseIntPipe) solicitacaoId: number,
    @Query() filtros: FiltrarAnotacoesDto,
  ) {
    return this.service.listar(solicitacaoId, filtros.marcador);
  }
}
