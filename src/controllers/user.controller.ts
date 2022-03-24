import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '#services/user/user.service';
import { createUserDto, updateUserDto } from '#dto/user/user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/role.decorator';

@ApiBearerAuth()
@Controller('user')
@UseGuards(AuthGuard('jwt'))
@Roles('admin')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.all();
  }

  @Post()
  async createUser(@Body() createUser: createUserDto) {
    return await this.userService.create(createUser);
  }

  @Put()
  async updateUser(@Body() updateUser: updateUserDto) {
    return await this.userService.update(updateUser);
  }

  @Get('/:id')
  async getUserByID(@Param('id') id: number) {
    return await this.userService.getById(id);
  }

  @Post('/:id/updatepoint')
  async updatePoint(@Param('id') id: number, @Query('point') point: number) {
    return await this.userService.updateScore(id, point);
  }

  @Post('/:id/resetpoint')
  async resetPoint(@Param('id') id: number) {
    return await this.userService.resetScore(id);
  }
}
