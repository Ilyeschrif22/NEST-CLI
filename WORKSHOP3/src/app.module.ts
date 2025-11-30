import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { MessagesController } from './messages/messages.controller';
import { UsersModule } from './users/users.module';
import { Message } from './messages/Message';
import { User } from './users/User';

@Module({
  imports: [
    MessagesModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'test',
      entities: [Message, User],
      synchronize: true,
    }),
  ],
  controllers: [AppController, MessagesController],
  providers: [AppService],
})
export class AppModule { }
