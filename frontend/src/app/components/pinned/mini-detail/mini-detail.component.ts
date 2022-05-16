import { Component, OnInit, Input } from '@angular/core';

import { FavoritesService } from '../../../services/favorites.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-mini-detail',
  templateUrl: './mini-detail.component.html',
  styleUrls: ['./mini-detail.component.css']
})
export class MiniDetailComponent implements OnInit {

  @Input() media: any = {}; // TODO: replace 'any' with 'IMovie | ISeries'
  get isFavorite(): boolean { return !!this.favoritesService.getFavorite(this.media._id) }

  constructor(private readonly favoritesService: FavoritesService) {}

  ngOnInit(): void {}

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
