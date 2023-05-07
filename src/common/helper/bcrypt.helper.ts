import * as bcrypt from 'bcrypt';

export const SALT = 10;

class BrcyptHelper {
    async hash(password: string) {
        try {
            const hashPassword = await bcrypt.hash(password, SALT);
            return hashPassword;
        } catch (err) {
            console.log(err);
        }
    }

    async comparePassword(password: string, hashPassword: string) {
        const isMatch = await bcrypt.compare(password, hashPassword);
        return isMatch;
    }
}

export const brcyptHelper = new BrcyptHelper();
