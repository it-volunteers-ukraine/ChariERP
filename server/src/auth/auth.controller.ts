import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserLoginRequest, UserLoginResponse } from './dto/user-login.request';
import { AuthService } from './auth.service';
import { IUser } from './interfaces/user.interface';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign in' })
  @ApiOkResponse({
    description: 'Returns a user object',
    type: UserLoginResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginRequest: UserLoginRequest): Promise<IUser> {
    return this.authService.login(loginRequest);
  }
}
