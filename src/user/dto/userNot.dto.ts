import { IsNotEmpty } from "class-validator";

export class UserNotDto {

  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  generation!: string;

  @IsNotEmpty()
  userName!: string;
}