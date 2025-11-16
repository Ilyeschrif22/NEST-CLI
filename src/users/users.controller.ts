import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

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

  @Post()
  createUser(@Body() body: any) {
    let exist = this.users.filter((user) => user.id === body.id);
    if (exist.length === 0) {
      this.users.push(body);
    } else {
      return 'already exist';
    }
    return body;
  }
}
