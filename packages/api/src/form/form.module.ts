import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { Form, FormSchema } from './schemas/form.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Form.name, schema: FormSchema }]),
  ],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
