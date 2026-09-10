import {
  IsIn,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CriarSolicitacaoDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 150)
  titulo!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  centroCusto!: string;

  @IsIn(['normal', 'urgente'])
  prioridade!: 'normal' | 'urgente';
}