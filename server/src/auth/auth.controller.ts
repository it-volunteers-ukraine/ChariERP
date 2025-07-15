import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLoginRequest, UserLoginResponse } from './dto/user-login.request';
import { plainToInstance } from 'class-transformer';

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
  async login(@Body() loginRequest: UserLoginRequest): Promise<UserLoginResponse> {
    const user = await this.authService.login(loginRequest);

    return plainToInstance(UserLoginResponse, user, {
      excludeExtraneousValues: false,
    });
  }
}
