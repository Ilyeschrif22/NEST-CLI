import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Headers,
  Put,
  Delete,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get('status')
  async getByStatus(@Query('status') status: string) {
    return this.usersService.findActive();
  }

  @Get('/email/:email')
  getByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) throw new NotFoundException('Utilisateur non trouvé');
    return user;
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,

  ) {

    return this.usersService.create(createUserDto);
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete()
  async removeAllUsers() {
    this.usersService.removeAll();
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get('active/:status')
  getUsersByActiveStatus(@Param('status') status: string) {
    return this.usersService.findActive();
  }


  @Patch('/compte/activer/:id/:password')
  activerCompte(@Param('id') id: string, @Param('password') password: string) {
    return this.usersService.activateAccount(id, password);
  }
}
