import { IsNotEmpty } from "class-validator";

export class UserDto {

  @IsNotEmpty()
  generation!: string;

  @IsNotEmpty()
  userName!: string;
}