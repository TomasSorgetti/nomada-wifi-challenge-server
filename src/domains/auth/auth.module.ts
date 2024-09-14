import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity';
import { PasswordService } from 'src/common/services/password.service';
import { Role } from '../roles/entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [AuthController],
  providers: [AuthService, PasswordService],
})
export class AuthModule {}
