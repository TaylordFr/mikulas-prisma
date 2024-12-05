import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateToyDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  material: string

  @IsNotEmpty()
  @IsNumber()
  weight: number
}
