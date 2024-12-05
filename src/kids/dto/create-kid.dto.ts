import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateKidDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsBoolean()
  goodorbad: boolean;
}
