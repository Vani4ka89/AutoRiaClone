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

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { ERoleAll } from '../auth/enums/roles.enum';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create user (can only admin)' })
  @Roles(ERoleAll.ADMIN)
  @UseGuards(RolesGuard)
  @Post('users')
  public async createUser(
    @Body() dto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.createUser(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my profile' })
  @Get('me')
  public async getMyProfile(
    @CurrentUser() userData: IUserData,
  ): Promise<UserResponseDto> {
    return await this.userService.getMyProfile(userData);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update my profile' })
  @Put('me')
  public async updateMyProfile(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateMyProfile(userData, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete my profile' })
  @Delete('me')
  public async deleteMyProfile(
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.userService.deleteMyProfile(userData);
  }

  @ApiOperation({ summary: 'Public profile' })
  @SkipAuth()
  @Get('users/:userId')
  public async getProfileById(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserResponseDto> {
    return await this.userService.getProfileById(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete profile (can only admin)' })
  @Roles(ERoleAll.ADMIN)
  @UseGuards(RolesGuard)
  @Delete('users/:userId')
  public async deleteProfile(@Param('userId') userId: string): Promise<void> {
    await this.userService.deleteProfile(userId);
  }

  //////////////////////////// GIVE A ROLE //////////////////////////////////

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Give a role (can only admin)' })
  @ApiResponse({ status: 200 })
  @Roles(ERoleAll.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post('users/role')
  public async addRole(
    @Body() dto: AddRoleRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.addRole(dto);
  }

  /////////////////////// BAN A USER AND UNBAN ///////////////////////////

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ban a user (can only admin and manager)' })
  @ApiResponse({ status: 200 })
  @Roles(ERoleAll.ADMIN, ERoleAll.MANAGER)
  @UseGuards(RolesGuard)
  @Post('users/ban')
  public async banUser(
    @Body() dto: BanUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.banUser(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unban a user (can only admin and manager)' })
  @ApiResponse({ status: 200 })
  @Roles(ERoleAll.ADMIN, ERoleAll.MANAGER)
  @UseGuards(RolesGuard)
  @Post('users/unban')
  public async unbanUser(
    @Body() dto: BanUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.unbanUser(dto);
  }
}
