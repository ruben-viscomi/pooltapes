import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MediaMetadataService } from '../../services/media-metadata/media-metadata.service';
import { FavoritesService } from '../../services/favorites.service';
import { ReactionsService } from '../../services/reactions.service';
import { IMovie } from '../../models/movie.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  private id: string = '';
  movie: IMovie = {} as IMovie;

  get isFavorite(): boolean { return !!this.favoritesService.getFavorite(this.movie._id) }
  get isLiked(): boolean { return this.reactionsService.isLiked(this.movie._id) }
  get isDisliked(): boolean { return this.reactionsService.isDisliked(this.movie._id) }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly mediaMetadata: MediaMetadataService,
    private readonly favoritesService: FavoritesService,
    private readonly reactionsService: ReactionsService
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
    if (this.isFavorite) return <void>(<unknown>this.favoritesService.deleteFavorite(this.movie._id));
    this.favoritesService.addFavorite(this.movie._id);
  }

  onLikeToggle(): void {
    this.reactionsService.like(this.movie._id);
  }

  onDislikeToggle(): void {
    this.reactionsService.dislike(this.movie._id);
  }

}
