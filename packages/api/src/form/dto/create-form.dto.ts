import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsEmail, IsString } from 'class-validator';

export class CreateFormDto {
  @ApiProperty({ description: 'Nome do usuário.', example: 'João da Silva' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email do usuário.',
    example: 'joao.silva@exaxmple.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Data de nascimento do usuário.',
    example: '1995-01-01',
  })
  @IsString()
  birthDate: string;

  @ApiProperty({
    description: 'Descrição sobre o usuário.',
    example: 'Sou uma pessoa tranquila e gosto, de viajar.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Número do CPF do usuário.',
    example: '123.456.789-01',
  })
  @IsString()
  cpf: string;

  @ApiProperty({ description: 'País do usuário.', example: 'Brasil' })
  @IsString()
  country: string;

  @ApiProperty({ description: 'Estado do usuário.', example: 'São Paulo' })
  @IsString()
  state: string;

  @ApiProperty({ description: 'Cidade do usuário.', example: 'Campinas' })
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Id do usuário no firebase.',
    example: 'essurblKYxgVps6DsRiQH9GS1nl1',
  })
  @IsString()
  user: string;
}
