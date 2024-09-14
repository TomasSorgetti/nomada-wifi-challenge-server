import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './domains/users/users.module';
import { AuthModule } from './domains/auth/auth.module';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { DatabaseModule } from './database/database.module';
import { RolesModule } from './domains/roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, jwtConfig],
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
