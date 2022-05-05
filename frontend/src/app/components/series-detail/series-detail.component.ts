import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MediaMetadataService } from '../../services/media-metadata/media-metadata.service';
import { UserDataService } from '../../services/user-data/user-data.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css']
})
export class SeriesDetailComponent implements OnInit {

  private id: string | null = '';
  series: any = {};

  get isFavorite(): boolean { return !!this.userData.getFavorite(this.series._id) }
  get isLiked(): boolean { return this.userData.isLiked(this.series._id, false) }
  get isDisliked(): boolean { return this.userData.isDisliked(this.series._id, false) }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly mediaMetadata: MediaMetadataService,
    private readonly userData: UserDataService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.mediaMetadata.getSeriesById(String(this.id)).subscribe(
      (series: any) => this.series = series,
      (err: any) => console.log(err)
    );
  }

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
    if (this.isFavorite) return <void>(<unknown>this.userData.deleteFavorite(this.series._id));
    this.userData.addFavorite(this.series._id, false);
  }

  onLikeToggle(): void {
    this.userData.like(this.series._id, false);
  }

  onDislikeToggle(): void {
    this.userData.dislike(this.series._id, false);
  }

}
