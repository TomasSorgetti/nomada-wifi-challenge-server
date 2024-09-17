import { Injectable } from '@nestjs/common';

export interface IUser {
  email: string;
  password: string;
}
export interface IUserSensitive {
  email: string;
}

@Injectable()
export class SensitiveUserService {
  constructor() {}

  getUserWithoutSensitiveData(user: IUser): IUserSensitive {
    const userWithoutSensitiveData = { ...user };
    delete userWithoutSensitiveData.password;
    // eliminar todas las propiedades que son sensibles
    return userWithoutSensitiveData;
  }
}
