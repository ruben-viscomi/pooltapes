import { IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class CreateCategoryDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  movies: boolean;

}
