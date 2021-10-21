import request from '../request';

import {AuthCredentialsDto} from './dto/auth-credentials.dto';
import {CreateUserDto} from './dto/create-user.dto';
import {ResultedUserLogin, ResultedUserSignup} from './dto/resulted-user.dto';

export const loginService = (data: AuthCredentialsDto) =>
  request<ResultedUserLogin>({
    method: 'POST',
    url: '/login',
    data,
  });

export const signupService = (data: CreateUserDto) =>
  request<ResultedUserSignup>({
    method: 'POST',
    url: '/register',
    data,
  });
