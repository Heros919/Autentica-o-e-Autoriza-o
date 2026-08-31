import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SolicitacoesController } from './solicitacoes.controller';
import { SolicitacoesService } from './solicitacoes.service';

@Module({
  imports: [AuthModule],
  controllers: [SolicitacoesController],
  providers: [SolicitacoesService],
})
export class SolicitacoesModule {}