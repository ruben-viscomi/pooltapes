import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MediaMetadataService } from '../../services/media-metadata/media-metadata.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css']
})
export class SeriesDetailComponent implements OnInit {

  private id: string | null = '';
  series: any = {};

  constructor(
    private readonly route: ActivatedRoute,
    private readonly mediaMetadata: MediaMetadataService
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

}
