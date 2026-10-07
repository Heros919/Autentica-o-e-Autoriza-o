import { Reflector } from '@nestjs/core';
import { validate } from 'class-validator';
import { RolesGuard } from './roles.guard';
import { FiltrarSolicitacoesDto } from '../../solicitacoes/dto/filtrar-solicitacoes.dto';

describe('RolesGuard', () => {
  it('permite acesso quando o papel do usuário está entre os exigidos', () => {
    class TestController {
      static teste() {}
    }

    Reflect.defineMetadata('roles', ['gestor', 'auditor'], TestController.teste);

    const guard = new RolesGuard(new Reflector());
    const context = {
      getHandler: () => TestController.teste,
      getClass: () => TestController,
      switchToHttp: () => ({
        getRequest: () => ({ user: { papel: 'auditor' } }),
      }),
    } as any;

    expect(guard.canActivate(context)).toBe(true);
  });

  it('nega acesso quando o usuário não possui papel permitido', () => {
    class TestController {
      static teste() {}
    }

    Reflect.defineMetadata('roles', ['gestor'], TestController.teste);

    const guard = new RolesGuard(new Reflector());
    const context = {
      getHandler: () => TestController.teste,
      getClass: () => TestController,
      switchToHttp: () => ({
        getRequest: () => ({ user: { papel: 'solicitante' } }),
      }),
    } as any;

    expect(guard.canActivate(context)).toBe(false);
  });
});

describe('FiltrarSolicitacoesDto', () => {
  it('aceita status rejeitada no filtro', async () => {
    const dto = Object.assign(new FiltrarSolicitacoesDto(), { status: 'rejeitada' });
    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });
});
