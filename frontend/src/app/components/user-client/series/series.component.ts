import { Component, OnInit } from '@angular/core';
import { MediaMetadataService } from '../../../services/media-metadata/media-metadata.service';

import { ICategory } from '../../../models/category.model';
import { IMovie } from '../../../models/movie.model';
import { ISeries } from '../../../models/series.model';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  categories: ICategory[] = [];
  pins: ISeries[] = [];

  constructor(private readonly mediaMetadata: MediaMetadataService) {
    this.mediaMetadata.getSeriesDash().subscribe(
      (cats: ICategory[]) => this.categories = cats,
      (err: any) => console.log(err)
    );
    this.mediaMetadata.getPinned('series').subscribe(
      (pinned: IMovie[] | ISeries[]) => this.pins = <ISeries[]>pinned,
      (err: any) => console.log(err)
    );
  }

  ngOnInit(): void {}

}
