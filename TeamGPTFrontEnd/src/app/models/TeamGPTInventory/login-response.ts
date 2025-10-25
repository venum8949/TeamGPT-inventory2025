export interface LoginResponse {
  accessToken?: string;
  expires: Date;
  roles?: string[];
}
