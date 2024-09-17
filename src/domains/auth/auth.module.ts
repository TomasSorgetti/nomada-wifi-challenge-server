import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity';
import { PasswordService } from 'src/common/services/password.service';
import { Role } from '../roles/entities/roles.entity';
import { UsersModule } from '../users/users.module';
import { JwtService } from 'src/common/services/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './guard/auth.guard';
import { SensitiveUserService } from 'src/common/services/sensitiveUser.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: configService.get<string>('jwt.expiresIn') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    SensitiveUserService,
    JwtService,
    AuthGuard,
  ],
})
export class AuthModule {}
