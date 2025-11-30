import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Message } from '../Message';

@Injectable()
export class MessagesRepository {
  constructor(
    @InjectRepository(Message)
    private readonly repo: MongoRepository<Message>,
  ) {}

  async findOne(id: string) {
    try {
      const objectId = new ObjectId(id);
      return await this.repo.findOne({ where: { id: objectId } as any });
    } catch (err) {
      return null;
    }
  }

  async findAll() {
    return this.repo.find();
  }

  create(content: string, status: string): Message {
    const message = new Message();
    message.content = content;
    message.status = status;
    message.date = new Date();
    return message;
  }

  async save(message: any) {
    return this.repo.save(message as Message);
  }

  async update(id: string, partial: Partial<Message>) {
    try {
      const existing = await this.findOne(id);
      if (!existing) return null;
      Object.assign(existing, partial);
      return await this.repo.save(existing as Message);
    } catch (err) {
      console.error('MessagesRepository.update error', err);
      throw err;
    }
  }
}
