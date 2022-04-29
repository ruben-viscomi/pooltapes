import { Component, OnInit } from '@angular/core';
import { MediaMetadataService } from '../../../services/media-metadata/media-metadata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: any = [];

  constructor(private readonly mediaMetadata: MediaMetadataService) {
    this.mediaMetadata.getHomeDash().subscribe(
      (cats: any) => this.categories = cats,
      (err: any) => console.log(err)
    )
  }

  ngOnInit(): void {
  }

}
