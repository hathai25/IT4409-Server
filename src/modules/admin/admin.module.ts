import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtAdminStrategy } from './strategies/jwt-admin.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([Admin]), 
        JwtModule.register({
            secret: process.env.ADMIN_SECRET_KEY || 'it4409-admin-team36',
            signOptions: { expiresIn: process.env.ADMIN_JWT_EXPIRES || '1h'}
        })
    ],
    providers: [AdminService, JwtAdminStrategy],
    controllers: [AdminController],
})
export class AdminModule {}
