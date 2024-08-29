import { UserService } from './user.service';

class UserController {
  constructor(private userService: UserService) {}

  async createAdmin(email: string, password: string) {
    return await this.userService.createAdmin(email, password);
  }

  async login(email: string, password: string) {
    return await this.userService.login(email, password);
  }
}

export const userController = new UserController(new UserService());
