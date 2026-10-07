import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type AnotacaoDocument = HydratedDocument<Anotacao>;

@Schema({
  collection: 'anotacoes',
  timestamps: {
    createdAt: 'criadaEm',
    updatedAt: 'atualizadaEm',
  },
})
export class Anotacao {
  @Prop({ required: true, index: true })
  solicitacaoId: number;

  @Prop({ required: true })
  autorId: number;

  @Prop({
    required: true,
    minlength: 3,
    maxlength: 1000,
  })
  texto: string;

  @Prop({
    type: [String],
    default: [],
  })
  marcadores: string[];

  @Prop({
    type: SchemaTypes.Mixed,
    default: {},
  })
  dadosAdicionais: Record<string, unknown>;

  criadaEm: Date;
  atualizadaEm: Date;
}

export const AnotacaoSchema = SchemaFactory.createForClass(Anotacao);

AnotacaoSchema.index({
  solicitacaoId: 1,
  criadaEm: -1,
});
