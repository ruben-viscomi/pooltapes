import { Component, OnInit } from '@angular/core';
import { MediaMetadataService } from '../../../services/media-metadata/media-metadata.service';

import { ICategory } from '../../../models/category.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  categories: ICategory[] = [];

  constructor(private readonly mediaMetadata: MediaMetadataService) {
    this.mediaMetadata.getMoviesDash().subscribe(
      (cats: ICategory[]) => this.categories = cats,
      (err: any) => console.log(err)
    )
  }

  ngOnInit(): void {}

  getPinned(): any {
    // TODO: implement the REAL PINNED in both service / backend
    var media: any = [];
    for (let cat of this.categories) {
      media.push(...cat.media);
    }
    return media;
  }

}
