import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateFormDto } from './dto/create-form.dto';
import { FormService } from './form.service';
import { Form } from './schemas/form.schema';

describe.only('FormService', () => {
  let formService: FormService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormService,
        {
          provide: getModelToken(Form.name),
          useValue: {
            new: jest.fn().mockResolvedValue(new Form()),
            constructor: jest.fn().mockResolvedValue(new Form()),
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    formService = module.get<FormService>(FormService);
  });

  it('should call create form method with expected params', async () => {
    const createNoteSpy = jest.spyOn(formService, 'create');
    const dto = new CreateFormDto();
    formService.create(dto);
    expect(createNoteSpy).toHaveBeenCalledWith(dto);
  });
});
