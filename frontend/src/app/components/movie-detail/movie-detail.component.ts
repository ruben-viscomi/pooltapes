import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MediaMetadataService } from '../../services/media-metadata/media-metadata.service';
import { UserDataService } from '../../services/user-data/user-data.service';
import { IMovie } from '../../models/movie.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  private id: string = '';
  movie: IMovie = {} as IMovie;

  get isFavorite(): boolean { return !!this.userData.getFavorite(this.movie._id) }
  get isLiked(): boolean { return this.userData.isLiked(this.movie._id, true) }
  get isDisliked(): boolean { return this.userData.isDisliked(this.movie._id, true) }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly mediaMetadata: MediaMetadataService,
    private readonly userData: UserDataService
  ) { }

  ngOnInit(): void {
    this.id = <string>this.route.snapshot.paramMap.get('id');
    this.mediaMetadata.getMovieById(this.id).subscribe(
      (movie: IMovie) => this.movie = movie,
      (err: any) => console.log(err)
    );
  }

  getBannerSrc(): string {
    return environment.assetServerUrl + `movies/${this.movie._id}/banner.jpg`;
  }

  getTitleLogoSrc(): string {
    return environment.assetServerUrl + `movies/${this.movie._id}/title-logo.png`;
  }

  onFavoriteToggle(): void {
    if (this.isFavorite) return <void>(<unknown>this.userData.deleteFavorite(this.movie._id));
    this.userData.addFavorite(this.movie._id, true);
  }

  onLikeToggle(): void {
    this.userData.like(this.movie._id, true);
  }

  onDislikeToggle(): void {
    this.userData.dislike(this.movie._id, true);
  }

}
