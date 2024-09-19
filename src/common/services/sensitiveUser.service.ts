import { Injectable } from '@nestjs/common';
import {
  IUserSensitive,
  IUserwithoutSensitiveData,
} from '../interfaces/sensitiveUser.interfaces';

@Injectable()
export class SensitiveUserService {
  constructor() {}

  /**
   * Servicio que devuelve el usuario sin la contraseña u otras propiedades sensibles
   * @param user
   * @returns
   */
  getUserWithoutSensitiveData(user: IUserwithoutSensitiveData): IUserSensitive {
    const userWithoutSensitiveData = { ...user };
    delete userWithoutSensitiveData.password;

    return userWithoutSensitiveData;
  }
}
