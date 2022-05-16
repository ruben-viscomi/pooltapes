import { Component, OnInit } from '@angular/core';
import { MediaMetadataService } from '../../../services/media-metadata/media-metadata.service';

import { ICategory } from '../../../models/category.interface';
import { IMovie } from '../../../models/movie.interface';
import { ISeries } from '../../../models/series.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: ICategory[] = [];
  pins: IMovie[] | ISeries[] = [];

  constructor(private readonly mediaMetadata: MediaMetadataService) {
    this.mediaMetadata.getHomeDash().subscribe(
      (cats: ICategory[]) => this.categories = cats,
      (err: any) => console.log(err)
    )
    this.mediaMetadata.getPinned('home').subscribe(
      (pinned: IMovie[] | ISeries[]) => this.pins = pinned,
      (err: any) => console.log(err)
    );
  }

  ngOnInit(): void {}

}
