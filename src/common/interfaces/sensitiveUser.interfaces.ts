import { IRoles } from 'src/domains/roles/interfaces/roles.interfaces';

export interface IUserwithoutSensitiveData {
  id: number;
  email: string;
  password: string;
  deletedAt: Date | null;
  roles: IRoles;
}
export interface IUserSensitive {
  id: number;
  email: string;
  deletedAt: Date | null;
  roles: IRoles;
}
