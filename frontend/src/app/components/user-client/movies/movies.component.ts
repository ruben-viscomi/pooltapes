import { Component, OnInit } from '@angular/core';
import { MediaMetadataService } from '../../../services/media-metadata/media-metadata.service';

import { ICategory } from '../../../models/category.interface';
import { IMovie } from '../../../models/movie.interface';
import { ISeries } from '../../../models/series.interface';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  categories: ICategory[] = [];
  pins: IMovie[] = [];

  constructor(private readonly mediaMetadata: MediaMetadataService) {
    this.mediaMetadata.getMoviesDash().subscribe(
      (cats: ICategory[]) => this.categories = cats,
      (err: any) => console.log(err)
    );
    this.mediaMetadata.getPinned('movies').subscribe(
      (pinned: IMovie[] | ISeries[]) => this.pins = <IMovie[]>pinned,
      (err: any) => console.log(err)
    );
  }

  ngOnInit(): void {}

}
