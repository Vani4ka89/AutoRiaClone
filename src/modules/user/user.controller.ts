import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserEntity } from '../../database/entities/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { ERole } from '../auth/enums/roles.enum';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { IUserData } from '../auth/types/user-data.type';
import { AddRoleRequestDto } from './models/dto/request/add-role.request.dto';
import { BanUserRequestDto } from './models/dto/request/ban-user.request.dto';
import { CreateUserRequestDto } from './models/dto/request/create-user.request.dto';
import { UpdateUserRequestDto } from './models/dto/request/update-user.request.dto';
import { UserResponseDto } from './models/dto/response/user.response.dto';
import { UserService } from './services/user.service';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  public async createUser(
    @Body() dto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.createUser(dto);
  }

  @ApiBearerAuth()
  @Get('me')
  public async getMyProfile(
    @CurrentUser() userData: IUserData,
  ): Promise<UserResponseDto> {
    return await this.userService.getMyProfile(userData);
  }

  @ApiBearerAuth()
  @Put('me')
  public async updateMyProfile(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateMyProfile(userData, dto);
  }

  @SkipAuth()
  @Get('users/:userId')
  public async getProfileById(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserEntity> {
    return await this.userService.getProfileById(userId);
  }

  @ApiBearerAuth()
  @Delete('users/:userId')
  public async deleteProfile(@Param('userId') userId: string): Promise<void> {
    await this.userService.deleteProfile(userId);
  }
  /////////////////////////////////////////////////////

  @SkipAuth()
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Give a role' })
  @ApiResponse({ status: 200 })
  // @Roles(ERole.ADMIN)
  // @UseGuards(JwtAccessGuard, RolesGuard)
  @Post('users/role')
  public async addRole(
    @Body() dto: AddRoleRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.addRole(dto);
  }

  @ApiBearerAuth()
  // @SkipAuth()
  @ApiOperation({ summary: 'Ban a user' })
  @ApiResponse({ status: 200 })
  @Roles(ERole.BUYER)
  @UseGuards(JwtAccessGuard)
  @Post('users/ban')
  public async ban(@Body() dto: BanUserRequestDto): Promise<UserEntity> {
    return await this.userService.banUser(dto);
  }
}
