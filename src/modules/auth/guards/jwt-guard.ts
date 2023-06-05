import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtAdminGuard } from 'src/modules/admin/guards';
import { Observable } from 'rxjs';
import { error } from 'console';

@Injectable()
//đang có lỗi tại đây
export class JwtGuard extends AuthGuard('jwt') {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const jwtAuthGuard = new JwtAuthGuard();
        const jwtAdminGuard = new JwtAdminGuard();
        const isPassJwtAdmin = new Promise((resolve, reject) => {
            try {
                const pass = jwtAdminGuard.canActivate(context);
                resolve(pass);
            } catch (error) {
                reject(error);
            }
        });
        isPassJwtAdmin
            .then(() => true)
            .catch((e) => {
                const isPassJwtAuth = new Promise((resolve, reject) => {
                    try {
                        const pass = jwtAuthGuard.canActivate(context);
                        resolve(pass);
                    } catch (error) {
                        reject(error);
                    }
                });
                isPassJwtAuth.then(() => true).catch(() => console.log(error));
            });
        // if(isPassJwtAdmin) {
        //    return true
        // }
        return false;
    }
}
// export class JwtGuard  implements CanActivate {
//    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//         // const jwtAdminGuard = new JwtAdminGuard()
//         // const jwtAuthGuard = new JwtAuthGuard()
//         // const isPassJwtAdmin = jwtAdminGuard.canActivate(context)
//         // if(isPassJwtAdmin) {
//         //     return true
//         // }
//         // const isPassJwtAuth = jwtAuthGuard.canActivate(context)
//         // if(isPassJwtAuth) {
//         //     return true
//         // }
//         // const hasOne = new Promise((resolve, reject) => {
//         //     jwtAdminGuard.canActivate(context)
//         // })
//         //const value  = hasOne.then((value: boolean): boolean => value)
//         return false
//    }
// }
