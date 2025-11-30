import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { User } from './User';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: MongoRepository<User>,
  ) { }

  private sanitizeUser(user: User | null) {
    if (!user) return null;

    return {
      id: user.id.toString(),
      email: user.email,
      active: user.active,
      createdAt: user.createdAt,
    };
  }

  private async findOneByIdRaw(id: string) {
    const objectId = new ObjectId(id);
    return this.repo.findOne({ where: { _id: objectId } });
  }


  async create(dto: CreateUserDto) {
    const user = this.repo.create(dto);
    const saved = await this.repo.save(user);
    return this.sanitizeUser(saved);
  }

  async findAll() {
    const users = await this.repo.find();
    return users.map(u => this.sanitizeUser(u));
  }

  async findOneById(id: string) {
    const user = await this.findOneByIdRaw(id);
    return this.sanitizeUser(user);
  }

  async findOneByEmail(email: string) {
    const user = await this.repo.findOne({ where: { email } as any });
    return this.sanitizeUser(user);
  }

  async findActive() {
    const users = await this.repo.find({ where: { active: true } as any });
    return users.map(u => this.sanitizeUser(u));
  }

  async update(id: string, partial: UpdateUserDto) {
    const existing = await this.findOneByIdRaw(id);
    if (!existing) throw new NotFoundException('User not found');

    Object.assign(existing, partial);
    const saved = await this.repo.save(existing);
    return this.sanitizeUser(saved);
  }

  async remove(id: string) {
    const objectId = new ObjectId(id);
    return this.repo.delete(objectId as any);
  }

  async removeAll() {
    return this.repo.deleteMany({});
  }

  async activateAccount(id: string, password: string) {
    const user = await this.findOneByIdRaw(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== password) {
      throw new NotFoundException('Password incorrect');
    }

    user.active = true;

    const saved = await this.repo.save(user);
    return this.sanitizeUser(saved);
  }
}
