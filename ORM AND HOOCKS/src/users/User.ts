import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  BeforeInsert,
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
  AfterLoad,
} from 'typeorm';
import { IsEmail, IsString } from 'class-validator';
import { Logger } from '@nestjs/common';

@Entity()
export class User {
  private logger = new Logger(User.name);

  @ObjectIdColumn()
  id: ObjectId;

  @IsEmail()
  @Column()
  email: string;

  @IsString()
  @Column()
  password: string;

  @Column()
  active: boolean;

  @Column()
  createdAt: Date;

  @BeforeInsert()
  setDefaults() {
    if (this.active === undefined) this.active = false;
    if (!this.createdAt) this.createdAt = new Date();

    this.logger.log(`Préparation à insérer l'utilisateur avec email: ${this.email}`);
  }

  @AfterInsert()
  afterInsert() {
    this.logger.log(`Utilisateur inséré avec succès: ${this.email}`);
  }

  @AfterUpdate()
  afterUpdate() {
    this.logger.log(`Utilisateur mis à jour: ${this.email}`);
  }

  @BeforeRemove()
  beforeRemove() {
    this.logger.log(`Suppression de l'utilisateur avec ID: ${this.id?.toHexString()}`);
  }

  @AfterLoad()
  afterLoad() {
    this.logger.log(`Utilisateur chargé depuis la base de données: ${this.email}`);
  }
}
