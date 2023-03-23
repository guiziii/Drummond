import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FormModule } from './form/form.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://qmguiziii:1234@cluster0.41qxb82.mongodb.net/test',
    ),
    FormModule,
  ],
})
export class AppModule {}
