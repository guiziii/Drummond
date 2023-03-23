import { Test, TestingModule } from '@nestjs/testing';
import { FormController } from './form.controller';
import { FormService } from './form.service';

describe.skip('FormController', () => {
  let controller: FormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormController],
      providers: [FormService],
    }).compile();

    controller = module.get<FormController>(FormController);
  });

  it.skip('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
