import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsBoolean
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: "L'email est obligatoire" })
  @IsEmail({}, { message: "L'email doit être une adresse email valide" })
  email: string;

  @IsNotEmpty({ message: "Le mot de passe est obligatoire" })
  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
