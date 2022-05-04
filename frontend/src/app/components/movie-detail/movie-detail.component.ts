import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MediaMetadataService } from '../../services/media-metadata/media-metadata.service';
import { UserDataService } from '../../services/user-data/user-data.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  private id: string | null = '';
  movie: any = {};

  get isFavorite(): boolean { return !!this.userData.getFavorite(this.movie._id) }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly mediaMetadata: MediaMetadataService,
    private readonly userData: UserDataService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.mediaMetadata.getMovieById(String(this.id)).subscribe(
      (movie: any) => this.movie = movie,
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
    // TODO
  }

  onDislikeToggle(): void {
    // TODO
  }

}
