import { api } from "../api.service";

type InsertUserFormRequest = {
  name: string;
  email: string;
  birthDate: string;
  description: string;
  cpf: string;
  country: string;
  state: string;
  city: string;
  user: string;
};

type UpdateUserFormRequest = {
  id: string;
} & InsertUserFormRequest;

export const FormsApi = {
  GetAllForms: async () => {
    return api.get(`form`);
  },
  GetUserForms: async (id: string) => {
    return api.get(`form/${id}`);
  },
  DeleteForm: async (id: string) => {
    return api.delete(`form/${id}`);
  },
  InsertUserForm: async (requestData: InsertUserFormRequest) => {
    return api.post(`form`, requestData);
  },
  UpdateUserForm: async (requestData: UpdateUserFormRequest) => {
    return api.patch(`form/${requestData.id}`, requestData);
  },
};
