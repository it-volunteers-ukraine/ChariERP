import bcrypt from 'bcrypt';

import { Admin, Users } from '..';
import { BaseService } from '../database/base.service';

class UserService extends BaseService {
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
