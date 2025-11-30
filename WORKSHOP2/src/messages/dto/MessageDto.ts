import { IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  name: string;
  prenom: string;
  age: number;
}
