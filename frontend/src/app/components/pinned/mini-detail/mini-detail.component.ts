import { Component, OnInit, Input } from '@angular/core';

import { UserDataService } from '../../../services/user-data/user-data.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-mini-detail',
  templateUrl: './mini-detail.component.html',
  styleUrls: ['./mini-detail.component.css']
})
export class MiniDetailComponent implements OnInit {

  @Input() media: any = {}; // TODO: replace 'any' with 'IMovie | ISeries'
  get isFavorite(): boolean { return !!this.userData.getFavorite(this.media._id) }

  constructor(private readonly userData: UserDataService) {}

  ngOnInit(): void {}

  getMediaTypeStr(): string {
    return (!!this.media.video) ? 'movies' : 'series';
  }

  getBannerSrc(): string {
    return environment.assetServerUrl + `${this.getMediaTypeStr()}/${this.media._id}/banner.jpg`;
  }

  getTitleLogoSrc(): string {
    return environment.assetServerUrl + `${this.getMediaTypeStr()}/${this.media._id}/title-logo.png`;
  }

  onFavoriteToggle(): void {
    if (this.isFavorite) return <void>(<unknown>this.userData.deleteFavorite(this.media._id));
    this.userData.addFavorite(
      this.media._id,
      this.getMediaTypeStr() === 'movies'
    );
  }

}
