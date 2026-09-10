import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Solicitacao } from './solicitacao.entity';
import { SolicitacoesController } from './solicitacoes.controller';
import { SolicitacoesService } from './solicitacoes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Solicitacao,
    ]),
  ],

  controllers: [
    SolicitacoesController,
  ],

  providers: [
    SolicitacoesService,
  ],
})
export class SolicitacoesModule {}