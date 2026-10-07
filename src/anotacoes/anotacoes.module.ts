import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitacao } from '../solicitacoes/solicitacao.entity';
import { Anotacao, AnotacaoSchema } from './anotacao.schema';
import { AnotacoesController } from './anotacoes.controller';
import { AnotacoesService } from './anotacoes.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Anotacao.name,
        schema: AnotacaoSchema,
      },
    ]),
    TypeOrmModule.forFeature([Solicitacao]),
  ],
  controllers: [AnotacoesController],
  providers: [AnotacoesService],
})
export class AnotacoesModule {}
