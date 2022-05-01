import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MediaMetadataService } from '../../services/media-metadata/media-metadata.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  private id: string | null = '';
  movie: any = {};

  constructor(
    private readonly route: ActivatedRoute,
    private readonly mediaMetadata: MediaMetadataService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.mediaMetadata.getMovieById(String(this.id)).subscribe(
      (movie: any) => this.movie = movie,
      (err: any) => console.log(err)
    );
  }

}
