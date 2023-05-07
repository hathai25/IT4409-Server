import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entity';
import { Admin } from '../admin/admin.entity';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Admin]),
    UsersModule, 
    JwtModule.register({
      // đang có lỗi env tại đây 
      secret: process.env.SECRET_KEY || 'it4409-team-36',
      signOptions: { expiresIn: '1h'}
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
