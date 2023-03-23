import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { FormModule } from './form/form.module';
import { ConfigModule } from '@nestjs/config';

const configService: ConfigService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      configService.get<string>('DATABASE_CONNECTION_STRING'),
    ),
    FormModule,
  ],
})
export class AppModule {}
