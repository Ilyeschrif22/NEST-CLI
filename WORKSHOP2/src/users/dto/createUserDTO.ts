import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: "Le nom d'utilisateur est obligatoire" })
  @IsString({
    message: "Le nom d'utilisateur doit être une chaîne de caractères",
  })
  username: string;

  @IsNotEmpty({ message: "L'email est obligatoire" })
  @IsEmail({}, { message: "L'email doit être une adresse email valide" })
  email: string;
}
