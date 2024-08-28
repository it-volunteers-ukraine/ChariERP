import { UserService } from './users.service';

class UserController {
  constructor(private userService: UserService) {}

  async login(email: string, password: string) {
    return await this.userService.login(email, password);
  }
}

export const userController = new UserController(new UserService());
