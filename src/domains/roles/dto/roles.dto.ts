import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class RoleDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;
}
