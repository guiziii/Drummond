import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Form, FormDocument } from './schemas/form.schema';
import { Model } from 'mongoose';

@Injectable()
export class FormService {
  constructor(@InjectModel(Form.name) private FormModel: Model<FormDocument>) {}

  async create(createFormDto: CreateFormDto): Promise<Form> {
    const createdForm = new this.FormModel(createFormDto);
    return createdForm.save();
  }

  async findAll(): Promise<Form[]> {
    return this.FormModel.find().exec();
  }

  findOne(id: string) {
    return this.FormModel.find({
      user: id,
    });
  }

  update(id: string, updateFormDto: UpdateFormDto) {
    return this.FormModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          name: updateFormDto.name,
          email: updateFormDto.email,
          birthDate: updateFormDto.birthDate,
          description: updateFormDto.description,
          cpf: updateFormDto.cpf,
          country: updateFormDto.country,
          state: updateFormDto.state,
          city: updateFormDto.city,
        },
      },
    );
  }

  remove(id: string) {
    return this.FormModel.findOneAndRemove({
      _id: id,
    }).exec();
  }
}
