import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLoginRequest } from './dto/user-login.request';
import { Public } from './auth.guard';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Sign in' })
  @ApiOkResponse({
    description: 'Returns access token',
  })
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginRequest: UserLoginRequest): Promise<{ access_token: string }> {
    return await this.authService.login(loginRequest);
  }
}
