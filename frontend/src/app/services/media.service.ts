import { Injectable } from '@angular/core';

import { ViewsService } from '../services/views.service';

import { IMovie } from '../models/movie.interface';
import { ISeries } from '../models/series.interface';
import { ISeason } from '../models/season.interface';
import { IVideo } from '../models/video.interface';

import { IView } from '../models/view.interface';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private _media: IMovie | ISeries = {} as IMovie;
  get media(): IMovie | ISeries { return this._media }

  constructor(private readonly viewsService: ViewsService) {}

  clearMedia(): void { this._media = {} as IMovie }
  setMedia(media: IMovie | ISeries): void { this._media = media }


  // NOTE: ↓↓↓ 'ISeries' specific methods ↓↓↓ //
  getEpisodeToWatch(): IVideo {
    const latestView: IView = this.viewsService.getLatest(this._media._id);
    if (!latestView) return this.getAllEpisodes()[0];

    const latestEp: IVideo = this.getEpisode(latestView.video);
    if (latestView.watchTimeMarker >= latestEp.endMarker)
      return this.getNextEpisode(latestEp._id);

    return latestEp;
  }

  getNextEpisode(id: string): IVideo {
    if (this._media.mediaType !== 'Series')
      throw new TypeError('episodes only exists on media of type \'ISeries\'');

    const episodes: IVideo[] = this.getAllEpisodes();

    const nextEp: number = episodes.findIndex((ep: IVideo) => ep._id === id) + 1;
    return (nextEp < episodes.length) ? episodes[nextEp] : {} as IVideo;
  }

  getEpisode(id: string): IVideo {
    const episodes: IVideo[] = this.getAllEpisodes();
    const found = episodes.find((ep: IVideo) => ep._id === id);
    return found ? found : {} as IVideo;
  }

  private getAllEpisodes(): IVideo[] {
    return (<ISeries>this._media).seasons
      .map((season: ISeason) => season.episodes).flat();
  }

}
