import { Injectable } from '@nestjs/common';
import { MessagesRepository } from '../repository/MessagesRepository';
import { Message } from '../Message';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) { }

  async findOne(id: string) {
    return this.messagesRepository.findOne(id);
  }

  async findAll() {
    return this.messagesRepository.findAll();
  }

  async create(content: string, status: string) {
    try {
      const message = this.messagesRepository.create(content, status);
      const saved = await this.messagesRepository.save(message);
      return saved;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}
