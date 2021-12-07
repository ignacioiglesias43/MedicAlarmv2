export interface ISignupForm {
  name?: string;
  lastname?: string;
  email: string;
  password: string;
  repeatPassword?: string;
  phone: string;
  key?: string,
}

export const initialSignupForm: ISignupForm = {
  name: '',
  lastname: '',
  email: '',
  password: '',
  repeatPassword: '',
  phone: '',
  key: '',
};
