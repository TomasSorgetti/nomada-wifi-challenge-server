import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(email: string, password: string) {
    return email;
  }
  register() {
    return 'register';
  }
  logout() {
    return 'logout';
  }
  refresh() {
    return 'refresh';
  }
  me() {
    return 'me';
  }
}
