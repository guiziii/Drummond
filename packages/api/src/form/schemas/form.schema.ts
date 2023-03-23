import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FormDocument = HydratedDocument<Form>;

@Schema()
export class Form {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  birthDate: string;

  @Prop()
  description: string;

  @Prop()
  cpf: string;

  @Prop()
  country: string;

  @Prop()
  state: string;

  @Prop()
  city: string;

  @Prop()
  user: string;
}

export const FormSchema = SchemaFactory.createForClass(Form);
