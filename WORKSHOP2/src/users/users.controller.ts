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
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDTO';

@Controller('users')
export class UsersController {
  users = [
    {
      id: 1,
      username: 'Mohamed',
      email: 'mohamed@esprit.tn',
      status: 'active',
    },
    { id: 2, username: 'Sarra', email: 'sarra@esprit.tn', status: 'inactive' },
    { id: 3, username: 'Ali', email: 'ali@esprit.tn', status: 'inactive' },
    { id: 4, username: 'Eya', email: 'eya@esprit.tn', status: 'active' },
  ];

  @Get()
  getUsers() {
    return this.users;
  }

  @Get('status')
  getByStatus(@Query('status') status: string) {
    if (status) {
      return this.users.find((user) => user.status == status);
    }
    return this.users;
  }

  @Get('email')
  getByEmail(@Query('email') email: string) {
    return this.users.find((user) => user.email == email);
  }

  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return this.users.find((user) => user.id == id);
  }

  // @Post()
  // createUser(@Body() body: any) {
  //   let exist = this.users.filter((user) => user.id === body.id);
  //   if (exist.length === 0) {
  //     this.users.push(body);
  //   } else {
  //     return 'already exist';
  //   }
  //   return body;
  // }

  @Post()
  createUser(
    @Body() createUserDto: CreateUserDto,
    @Headers('authorization') authorization: string,
  ) {
    if (!authorization) {
      return { message: 'En-tête Authorization manquant' };
    }

    const newUser = {
      id: this.users.length + 1,
      username: createUserDto.username,
      email: createUserDto.email,
      status: 'active',
    };

    this.users.push(newUser);

    return newUser;
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    const userId = parseInt(id);

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === userId) {
        this.users[i].username = createUserDto.username;
        this.users[i].email = createUserDto.email;
        return this.users[i];
      }
    }

    return { message: 'Utilisateur non trouvé' };
  }

  @Get('active/:status')
  getUsersByActiveStatus(@Param('status') status: string) {
    return this.users.filter((user) => user.status === status);
  }
}
