import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Repository } from 'typeorm';
import { Solicitacao } from '../solicitacoes/solicitacao.entity';
import { Anotacao, AnotacaoDocument } from './anotacao.schema';
import { CriarAnotacaoDto } from './dto/criar-anotacao.dto';

@Injectable()
export class AnotacoesService {
  constructor(
    @InjectModel(Anotacao.name)
    private readonly anotacoes: Model<AnotacaoDocument>,
    @InjectRepository(Solicitacao)
    private readonly solicitacoes: Repository<Solicitacao>,
  ) {}

  private async confirmarSolicitacao(id: number) {
    const solicitacao = await this.solicitacoes.findOne({
      where: { id },
    });

    if (!solicitacao) {
      throw new NotFoundException('Solicitação não encontrada');
    }
  }

  async criar(
    solicitacaoId: number,
    autorId: number,
    dto: CriarAnotacaoDto,
  ) {
    await this.confirmarSolicitacao(solicitacaoId);

    return this.anotacoes.create({
      solicitacaoId,
      autorId,
      texto: dto.texto,
      marcadores: dto.marcadores ?? [],
      dadosAdicionais: dto.dadosAdicionais ?? {},
    });
  }

  async listar(solicitacaoId: number, marcador?: string) {
    await this.confirmarSolicitacao(solicitacaoId);

    const filtro: Record<string, unknown> = {
      solicitacaoId,
    };

    if (marcador) {
      filtro.marcadores = marcador;
    }

    return this.anotacoes
      .find(filtro)
      .sort({ criadaEm: -1 })
      .lean()
      .exec();
  }
}
