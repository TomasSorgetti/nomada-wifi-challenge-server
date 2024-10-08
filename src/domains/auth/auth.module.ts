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
import { SensitiveUserService } from 'src/common/services/sensitiveUser.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.accessSecret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.accessTokenExpiration'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    SensitiveUserService,
    JwtService,
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
