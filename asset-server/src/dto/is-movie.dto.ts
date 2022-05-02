import { IsBooleanString, IsNotEmpty } from 'class-validator';

export class IsMovieDto {

  @IsNotEmpty()
  @IsBooleanString()
  movie: string;

}
