import bcrypt from 'bcrypt';

import { Admin, Users } from '..';
import { BaseService } from '../database/base.service';

class UserService extends BaseService {
  async createAdmin(email: string, password: string) {
    await this.connect();
    const admins = await Admin.find();

    if (admins.length > 0) {
      return { message: 'Admin already exists', success: false };
    }

    const hash = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ email, password: hash });
    const response = await newAdmin.save();

    return { success: true, data: response };
  }

  async login(email: string, password: string) {
    await this.connect();

    const user = await Users.findOne({ email });
    const admin = await Admin.findOne({ email });

    if (user || admin) {
      const foundUser = user || admin;
      const compare = await bcrypt.compare(password, foundUser.password);

      if (compare) {
        return foundUser;
      }

      return { message: 'userIncorrect' };
    }

    return { message: 'userNotFound' };
  }
}

export { UserService };
