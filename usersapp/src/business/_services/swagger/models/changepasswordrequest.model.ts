
export interface ChangePasswordRequest {
  token: string;
  password: string;
  confirm_password: string;
}
