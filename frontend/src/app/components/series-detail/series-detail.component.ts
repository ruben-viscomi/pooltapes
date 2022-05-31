import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MediaMetadataService } from '../../services/media-metadata/media-metadata.service';
import { FavoritesService } from '../../services/favorites.service';
import { ReactionsService } from '../../services/reactions.service';
import { ISeries } from '../../models/series.interface';
import { environment } from '../../../environments/environment';

//
import { MediaService } from '../../services/media.service';
import { ViewsService } from '../../services/views.service';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css']
})
export class SeriesDetailComponent implements OnInit {

  private id: string = '';
  series: ISeries = {} as ISeries;

  get isFavorite(): boolean { return !!this.favoritesService.getFavorite(this.series._id) }
  get isLiked(): boolean { return this.reactionsService.isLiked(this.series._id) }
  get isDisliked(): boolean { return this.reactionsService.isDisliked(this.series._id) }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly mediaMetadata: MediaMetadataService,
    private readonly favoritesService: FavoritesService,
    private readonly reactionsService: ReactionsService,

    private readonly mediaService: MediaService,
    private readonly viewsService: ViewsService
  ) { }

  ngOnInit(): void {
    this.id = <string>this.route.snapshot.paramMap.get('id');
    this.mediaMetadata.getSeriesById(this.id).subscribe(
      (series: ISeries) => {
        this.series = series;
        this.mediaService.setMedia(this.series);
      },
      (err: any) => console.log(err)
    );
  }

  getEpisodeId(): string { return this.mediaService.getEpisodeToWatch()._id }

  getBannerSrc(): string {
    return environment.assetServerUrl + `series/${this.series._id}/banner.jpg`;
  }

  getTitleLogoSrc(): string {
    return environment.assetServerUrl + `series/${this.series._id}/title-logo.png`;
  }

  getEpisodeThumbSrc(id: string): string {
    return environment.assetServerUrl + `videos/${id}/thumb.jpg`;
  }

  onFavoriteToggle(): void {
    if (this.isFavorite) return this.favoritesService.deleteFavorite(this.series._id);
    this.favoritesService.addFavorite(this.series._id);
  }

  onLikeToggle(): void {
    this.reactionsService.like(this.series._id);
  }

  onDislikeToggle(): void {
    this.reactionsService.dislike(this.series._id);
  }

}
