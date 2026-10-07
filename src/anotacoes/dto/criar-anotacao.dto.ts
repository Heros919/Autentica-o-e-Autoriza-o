import {
  ArrayMaxSize,
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CriarAnotacaoDto {
  @IsString()
  @MinLength(3)
  @MaxLength(1000)
  texto: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @MaxLength(30, { each: true })
  marcadores?: string[];

  @IsOptional()
  @IsObject()
  dadosAdicionais?: Record<string, unknown>;
}
