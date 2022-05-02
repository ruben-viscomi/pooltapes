import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.css']
})
export class MediaCardComponent implements OnInit {

  @Input() media: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  getThumbSrc(): string {
    const mediaType: string = !!this.media.video ? 'movies' : 'series';
    return environment.assetServerUrl + `${mediaType}/${this.media._id}/thumb.jpg`;
  }

}
