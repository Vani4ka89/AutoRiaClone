import * as process from 'node:process';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';

import { UserEntity } from '../../../database/entities/user.entity';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { RoleRepository } from '../../repository/services/role.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserService } from '../../user/services/user.service';
import { SingInRequestDto } from '../models/dto/request/sing-in.request.dto';
import { SingUpRequestDto } from '../models/dto/request/sing-up.request.dto';
import { SingUpAdminRequestDto } from '../models/dto/request/sing-up-admin.request.dto';
import { AuthUserResponseDto } from '../models/dto/response/auth-user.response.dto';
import { TokenResponseDto } from '../models/dto/response/token.response.dto';
import { ITokenPair } from '../types/token.type';
import { IUserData } from '../types/user-data.type';
import { AuthMapper } from './auth.mapper';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';

config({ path: './environments/.env' });

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly authCacheService: AuthCacheService,
    private readonly roleRepository: RoleRepository,
  ) {}

  public async signUpAdmin(
    dto: SingUpAdminRequestDto,
  ): Promise<Partial<AuthUserResponseDto>> {
    await this.userService.isEmailUniqueOrThrow(dto.email);
    const password = await bcrypt.hash(dto.password, +process.env.SECRET_SALT);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
  }

  public async signUp(
    dto: SingUpRequestDto,
  ): Promise<Partial<AuthUserResponseDto>> {
    await this.userService.isEmailUniqueOrThrow(dto.email);
    const password = await bcrypt.hash(dto.password, +process.env.SECRET_SALT);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
    return AuthMapper.toResponseSignUpDto(user);
  }

  public async signIn(dto: SingInRequestDto): Promise<AuthUserResponseDto> {
    const user = await this.findUserAndMatchPass(dto);
    const tokens = await this.tokenService.generateTokenPair({
      userId: user.id,
    });
    await this.removeRefreshTokens(user.id);
    await this.saveAuthTokens(user.id, tokens);
    return AuthMapper.toResponseSignInDto(user, tokens);
  }

  public async logOut(userData: IUserData): Promise<void> {
    await this.removeRefreshTokens(userData.userId);
  }

  public async updateRefreshToken(
    userData: IUserData,
  ): Promise<TokenResponseDto> {
    const user = await this.userRepository.findOneBy({
      id: userData.userId,
    });
    await this.removeRefreshTokens(user.id);
    const tokens = await this.tokenService.generateTokenPair({
      userId: user.id,
    });
    await this.saveAuthTokens(user.id, tokens);
    return tokens;
  }

  /////////////////////////////////////////////////////////////////////

  private async saveAuthTokens(
    userId: string,
    tokens: ITokenPair,
  ): Promise<void> {
    await Promise.all([
      this.refreshTokenRepository.saveToken(userId, tokens.refreshToken),
      this.authCacheService.saveToken(userId, tokens.accessToken),
    ]);
  }

  private async removeRefreshTokens(userId: string): Promise<void> {
    await Promise.all([
      this.refreshTokenRepository.delete({
        user_id: userId,
      }),
      this.authCacheService.removeToken(userId),
    ]);
  }

  private async findUserAndMatchPass(
    dto: SingInRequestDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: { id: true, password: true },
    });
    if (!user) {
      throw new UnauthorizedException('Wrong email or password');
    }
    const isMatched = await bcrypt.compare(dto.password, user.password);
    if (!isMatched) {
      throw new UnauthorizedException('Wrong email or password');
    }
    return user;
  }
}
