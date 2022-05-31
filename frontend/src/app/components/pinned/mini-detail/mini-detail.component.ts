import { Component, OnInit, Input } from '@angular/core';

import { FavoritesService } from '../../../services/favorites.service';
import { MediaService } from '../../../services/media.service';

import { IMovie } from '../../../models/movie.interface';
import { ISeries } from '../../../models/series.interface';
import { IVideo } from '../../../models/video.interface';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-mini-detail',
  templateUrl: './mini-detail.component.html',
  styleUrls: ['./mini-detail.component.css']
})
export class MiniDetailComponent implements OnInit {

  @Input() media: IMovie | ISeries = {} as IMovie; // TODO: replace 'any' with 'IMovie | ISeries'
  get isFavorite(): boolean { return !!this.favoritesService.getFavorite(this.media._id) }

  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly mediaService: MediaService
  ) {}

  ngOnInit(): void {}

  getVideoId(): string {
    this.mediaService.setMedia(this.media);
    if (this.media.mediaType === 'Movie') {
      const vid: IVideo | string = (<IMovie>this.media).video;
      return (typeof vid === 'string') ? vid : vid._id;
    }
    return this.mediaService.getEpisodeToWatch()._id;
  }

  getMediaTypeStr(): string {
    return (this.media.mediaType === 'Movie') ? 'movies' : 'series';
  }

  getBannerSrc(): string {
    return environment.assetServerUrl + `${this.getMediaTypeStr()}/${this.media._id}/banner.jpg`;
  }

  getTitleLogoSrc(): string {
    return environment.assetServerUrl + `${this.getMediaTypeStr()}/${this.media._id}/title-logo.png`;
  }

  onFavoriteToggle(): void {
    if (this.isFavorite) return <void>(<unknown>this.favoritesService.deleteFavorite(this.media._id));
    this.favoritesService.addFavorite(this.media._id);
  }

}
