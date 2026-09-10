import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export type StatusSolicitacao = 'pendente' | 'aprovada';
export type PrioridadeSolicitacao = 'normal' | 'urgente';

@Entity('solicitacoes')
export class Solicitacao {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 150,
  })
  titulo!: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'pendente',
  })
  status!: StatusSolicitacao;

  @Column({
    name: 'centro_custo',
    type: 'varchar',
    length: 30,
  })
  centroCusto!: string;

  @Column({
    type: 'varchar',
    length: 10,
    default: 'normal',
  })
  prioridade!: PrioridadeSolicitacao;

  @VersionColumn()
  versao!: number;

  @CreateDateColumn({
    name: 'criada_em',
  })
  criadaEm!: Date;

  @UpdateDateColumn({
    name: 'atualizada_em',
  })
  atualizadaEm!: Date;
}