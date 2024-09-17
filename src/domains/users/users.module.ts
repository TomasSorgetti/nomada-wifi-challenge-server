import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { RolesModule } from '../roles/roles.module';
import { JwtService } from 'src/common/services/jwt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PasswordService } from 'src/common/services/password.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: configService.get<string>('jwt.expiresIn') },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, PasswordService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
