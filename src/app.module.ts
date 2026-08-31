import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SolicitacoesModule } from './solicitacoes/solicitacoes.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsuariosModule,
    AuthModule,
    SolicitacoesModule,
  ],
})
export class AppModule {}