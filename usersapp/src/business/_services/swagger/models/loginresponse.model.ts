import { LoginDataResponse } from './logindataresponse.model'

export interface LoginResponse {
  message: string;
  token: string;
  user: LoginDataResponse;
}
