import { UserResponse } from './userresponse.model'

export interface AllUserResponse {
  message: string;
  users: UserResponse[];
}
