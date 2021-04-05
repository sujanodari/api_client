import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JoiValidationPipe } from '../common/pipes/joiValidationPipe';
import { createUserSchema } from './schema/createUserSchema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async create(@Res() res, @Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        user,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: err.message,
        status: 400,
      });
    }
  }

  @Get()
  async findAll(@Res() res, @Query() paginationQuery: PaginationQueryDto) {
    try {
      const users = await this.usersService.findAll(paginationQuery);
      return res.status(HttpStatus.OK).json(users);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: err.message,
        status: 400,
      });
    }
  }
}
