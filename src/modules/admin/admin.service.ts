import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { LoginAdminDto } from './dtos/login-admin.dto';
import { brcyptHelper } from 'src/common/helper/bcrypt.helper';
import { JwtService } from '@nestjs/jwt';
import { UpdateAdminDto } from './dtos';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly AdminRepository: Repository<Admin>,
        private readonly jwtService: JwtService,
    ) {}

    // api login admin
    async loginAdmin(loginAdminDto: LoginAdminDto): Promise<any> {
        const admin = await this.AdminRepository.findOne({
            where: { email: loginAdminDto.email, deleted: false },
        });
        if (
            !admin ||
            !brcyptHelper.comparePassword(
                loginAdminDto.password,
                admin.password,
            )
        ) {
            throw new ForbiddenException('email or password is invalid');
        }

        return {
            access_token: await this.jwtService.signAsync({
                email: admin.email,
                sub: admin.id,
                roles: admin.roles,
            }),
        };
    }

    //crud admin:
    async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
        const admin = await this.AdminRepository.find({
            where: { email: createAdminDto.email },
        });
        if (admin.length !== 0) {
            throw new BadRequestException('email is exist in system');
        }
        const newAdmin = new Admin();
        newAdmin.email = createAdminDto.email;
        newAdmin.password = createAdminDto.password;
        newAdmin.roles = createAdminDto?.roles;

        return await this.AdminRepository.save(newAdmin);
    }

    async updateAdminById(
        id: number,
        updateAdminDto: UpdateAdminDto,
    ): Promise<Admin> {
        const updateAdmin = await this.AdminRepository.update(
            id,
            updateAdminDto,
        );

        const afterAdmin = await this.AdminRepository.findOneBy({ id: id });

        return afterAdmin;
    }

    async findAdminById(id: number): Promise<Admin> {
        const currAdmin = await this.AdminRepository.findOneBy({ id: id });

        if (!currAdmin) {
            throw new NotFoundException(`Admin have id ${id} not found`);
        }

        return currAdmin;
    }

    async softDeleteAdminById(id: number): Promise<Admin> {
        const currAdmin = await this.findAdminById(id);
        const deleteAdmin = await this.AdminRepository.softRemove(currAdmin);

        return this.AdminRepository.save(deleteAdmin);
    }

    async restoreAdminById(id: number): Promise<Admin> {
        const deleteSoftAdmin = await this.AdminRepository.findOne({
            where: { id: id, deleted: true },
            withDeleted: true,
        });
        if (!deleteSoftAdmin) {
            throw new NotFoundException(`admin with id ${id} is not deleted`);
        }
        const restoreAdmin = await this.AdminRepository.recover(
            deleteSoftAdmin,
        );

        return await this.AdminRepository.save(restoreAdmin);
    }

    async destroyAdminById(id: number): Promise<any> {
        const softDeleteAdmin = await this.AdminRepository.findOne({
            where: { id: id, deleted: true },
            withDeleted: true,
        });
        if (!softDeleteAdmin) {
            throw new NotFoundException(`admin with id ${id} is not in trash`);
        }

        const destroyAdmin = await this.AdminRepository.delete(id);
        return destroyAdmin;
    }

    async findAllAdmin(): Promise<Admin[]> {
        const allAdmin = await this.AdminRepository.find();

        return allAdmin;
    }

    async findAllDeleteAdmin(): Promise<Admin[]> {
        const allDeleteAdmin = await this.AdminRepository.find({
            withDeleted: true,
            where: { deleted: true },
        });

        return allDeleteAdmin;
    }
}
