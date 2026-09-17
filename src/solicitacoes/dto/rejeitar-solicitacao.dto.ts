import { IsInt, IsString, Length, Min } from 'class-validator';

export class RejeitarSolicitacaoDto {
  @IsInt()
  @Min(1)
  versao!: number;

  @IsString()
  @Length(10, 200, {
    message: 'A justificativa deve ter entre 10 e 200 caracteres.',
  })
  justificativa!: string;
}