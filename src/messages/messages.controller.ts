import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageDto } from './dto/MessageDto';

@Controller('messages')
export class MessagesController {
  @Get()
  getMessages() {
    return 'This action returns all messages';
  }

  @Get('/:id')
  getMessageById(@Param('id') id: string) {
    return 'message1';
  }

  @Post()
  CreateMessage(@Body() body: MessageDto) {
    return body;
  }
}
