import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto, UserLoginResponseDto } from './dto/user-login.dto';
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
    type: UserLoginResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @Post('login')
  async login(@Body() loginRequest: UserLoginDto): Promise<IUser> {
    return this.authService.login(loginRequest);
  }
}
