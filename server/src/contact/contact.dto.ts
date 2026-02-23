import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class ContactDto {
  @IsString({ message: 'El nombre debe ser texto.' })
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
  @MaxLength(100, { message: 'El nombre no puede superar 100 caracteres.' })
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsEmail({}, { message: 'El email no es válido.' })
  @IsNotEmpty({ message: 'El email es requerido.' })
  @MaxLength(254, { message: 'El email es demasiado largo.' })
  @Transform(({ value }) => value?.trim().toLowerCase())
  email: string;

  @IsString({ message: 'El mensaje debe ser texto.' })
  @IsNotEmpty({ message: 'El mensaje es requerido.' })
  @MinLength(10, { message: 'El mensaje debe tener al menos 10 caracteres.' })
  @MaxLength(2000, { message: 'El mensaje no puede superar 2000 caracteres.' })
  @Transform(({ value }) => value?.trim())
  message: string;
}
