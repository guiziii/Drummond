import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { ApiBody } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { FormService } from './form.service';

@ApiTags('form')
@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  @ApiOperation({
    description: 'Método que cadastra o form criado pelo usuário.',
  })
  create(@Body() createFormDto: CreateFormDto) {
    return this.formService.create(createFormDto);
  }

  @Get()
  @ApiOperation({
    description: 'Método que busca todos os forms do Database.',
  })
  findAll() {
    return this.formService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    description:
      'Método que busca todos os forms do usuário. O parâmetro Id refere-se ao id do usuário firebase.',
  })
  findOne(@Param('id') id: string) {
    return this.formService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    description: 'Método que atualiza o form.',
  })
  @ApiBody({
    type: UpdateFormDto,
    examples: {
      a: {
        summary: 'Update body',
        description:
          'Dados utilizados para atualização do form. A variável Id refere-se ao id form',
        value: {
          name: 'Ronaldo Fenômeno',
          email: 'zuurc@hotmail.com',
          birthDate: '2023-03-14',
          description: 'Ronaldo 2.0',
          cpf: '448.774.158-07',
          country: 'Brazil',
          state: 'Alagoas',
          city: 'Campo Grande',
          user: 'essurblKYxgVps6DsRiQH9GS1nl1',
        } as UpdateFormDto,
      },
    },
  })
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formService.update(id, updateFormDto);
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Método que deleta o form.',
  })
  remove(@Param('id') id: string) {
    return this.formService.remove(id);
  }
}
