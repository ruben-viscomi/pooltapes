import { IsOptional, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateCategoryDto {

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  // TODO: remove from here and create dedicated route to $push (POST), $pull(DELETE) medias.
  @IsOptional()
  @IsUUID('4', { each: true })
  media: string[];

}
