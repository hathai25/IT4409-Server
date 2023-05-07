import { ForbiddenException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { LoginAdminDto } from './dtos/login-admin.dto';
import { brcyptHelper } from 'src/common/helper/bcrypt.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin) private readonly AdminRepository: Repository<Admin>,
        private readonly jwtService: JwtService
    ) {}

    async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
        const newAdmin = new Admin();
        newAdmin.email = createAdminDto.email;
        newAdmin.password = createAdminDto.password;

        return await this.AdminRepository.save(newAdmin)
    }

    async loginAdmin(loginAdminDto: LoginAdminDto): Promise<any> {
        const admin = await this.AdminRepository.findOne({where: {email: loginAdminDto.email, deleted: false}})
        if (!admin || !brcyptHelper.comparePassword(loginAdminDto.password, admin.password)) {
            throw new ForbiddenException('email or password is invalid')
        }

        return {
            access_token: await this.jwtService.signAsync({email: admin.email, sub: admin.id, roles: admin.role})
        }
    }
}
