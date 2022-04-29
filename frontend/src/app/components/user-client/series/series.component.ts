import { Component, OnInit } from '@angular/core';
import { MediaMetadataService } from '../../../services/media-metadata/media-metadata.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  categories: any = [];

  constructor(private readonly mediaMetadata: MediaMetadataService) {
    this.mediaMetadata.getSeriesDash().subscribe(
      (cats: any) => this.categories = cats,
      (err: any) => console.log(err)
    )
  }

  ngOnInit(): void {
  }

}
