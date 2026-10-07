import { IsOptional, IsString, MaxLength } from 'class-validator';

export class FiltrarAnotacoesDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  marcador?: string;
}
