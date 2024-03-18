import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UserResponseDto } from '../user/models/dto/response/user.response.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { SingInRequestDto } from './models/dto/request/sing-in.request.dto';
import { SingUpRequestDto } from './models/dto/request/sing-up.request.dto';
import { SingUpAdminRequestDto } from './models/dto/request/sing-up-admin.request.dto';
import { AuthUserResponseDto } from './models/dto/response/auth-user.response.dto';
import { TokenResponseDto } from './models/dto/response/token.response.dto';
import { AuthService } from './services/auth.service';
import { IUserData } from './types/user-data.type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @ApiOperation({ summary: 'Registration ADMIN' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Wrong request parameters',
  })
  @ApiConflictResponse({ description: 'User already exist' })
  @Post('sign-up/admin')
  public async signUpAdmin(
    @Body() dto: SingUpAdminRequestDto,
  ): Promise<AuthUserResponseDto> {
    return await this.authService.signUpAdmin(dto);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Registration user' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Wrong request parameters',
  })
  @ApiConflictResponse({ description: 'User already exist' })
  @Post('sign-up')
  public async signUp(
    @Body() dto: SingUpRequestDto,
  ): Promise<AuthUserResponseDto> {
    return await this.authService.signUp(dto);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Login' })
  @ApiUnauthorizedResponse({ description: 'Wrong email or password' })
  @Post('sign-in')
  public async signIn(
    @Body() dto: SingInRequestDto,
  ): Promise<AuthUserResponseDto> {
    return await this.authService.signIn(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout' })
  @ApiUnauthorizedResponse({ description: 'Token not valid' })
  @Post('logout')
  public async logOut(@CurrentUser() userData: IUserData): Promise<void> {
    return await this.authService.logOut(userData);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: 'Update token pair' })
  @ApiUnauthorizedResponse({ description: 'Token not valid' })
  @Post('refresh')
  public async updateRefreshToken(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenResponseDto> {
    return await this.authService.updateRefreshToken(userData);
  }
}
