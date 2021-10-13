export interface ISignupForm {
  name?: string;
  lastName?: string;
  email: string;
  password: string;
  repeatPassword?: string;
  phone: string;
}

export const initialSignupForm: ISignupForm = {
  name: '',
  lastName: '',
  email: '',
  password: '',
  repeatPassword: '',
  phone: '',
};
