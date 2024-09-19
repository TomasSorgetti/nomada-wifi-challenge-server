import { IUserSensitive } from 'src/common/interfaces/sensitiveUser.interfaces';

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  user: IUserSensitive;
}
