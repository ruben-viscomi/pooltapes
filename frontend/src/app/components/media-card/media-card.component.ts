import { Component, OnInit, Input } from '@angular/core';

import { IMovie } from '../../models/movie.interface';
import { ISeries } from '../../models/series.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.css']
})
export class MediaCardComponent implements OnInit {

  @Input() media: IMovie | ISeries = {} as IMovie;

  constructor() {}

  ngOnInit(): void {}

  getThumbSrc(): string {
    const mediaType: string = (this.media.mediaType === 'Movie') ? 'movies' : 'series';
    return environment.assetServerUrl + `${mediaType}/${this.media._id}/thumb.jpg`;
  }

}
