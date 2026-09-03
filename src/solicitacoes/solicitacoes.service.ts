import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarSolicitacaoDto } from './dto/criar-solicitacao.dto';
import { Solicitacao } from './solicitacao.entity';

@Injectable()
export class SolicitacoesService {
  constructor(
    @InjectRepository(Solicitacao)
    private readonly repository: Repository<Solicitacao>,
  ) {}

  async criar(dto: CriarSolicitacaoDto): Promise<Solicitacao> {
    const nova = this.repository.create({
      ...dto,
      status: 'pendente',
    });
    return await this.repository.save(nova);
  }

  async listar(): Promise<Solicitacao[]> {
    return await this.repository.find();
  }

  async gerarRelatorio() {
    const total = await this.repository.count();
    const pendentes = await this.repository.count({ where: { status: 'pendente' } });
    const aprovadas = await this.repository.count({ where: { status: 'aprovada' } });

    return {
      total,
      pendentes,
      aprovadas,
    };
  }

  async buscarPorId(id: number): Promise<Solicitacao> {
    const solicitacao = await this.repository.findOneBy({ id });
    if (!solicitacao) {
      throw new NotFoundException(`Solicitação com ID ${id} não encontrada.`);
    }
    return solicitacao;
  }

  async aprovar(id: number): Promise<Solicitacao> {
    const solicitacao = await this.buscarPorId(id);
    solicitacao.status = 'aprovada';
    return await this.repository.save(solicitacao);
  }
}