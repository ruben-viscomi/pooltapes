import { Component, OnInit } from '@angular/core';
import { MediaMetadataService } from '../../../services/media-metadata/media-metadata.service';

import { ICategory } from '../../../models/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: ICategory[] = [];

  constructor(private readonly mediaMetadata: MediaMetadataService) {
    this.mediaMetadata.getHomeDash().subscribe(
      (cats: ICategory[]) => this.categories = cats,
      (err: any) => console.log(err)
    )
  }

  ngOnInit(): void {
  }

}
