import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() category: any = {}; // TODO: replace 'any' with proper Data Model.

  constructor() { }

  ngOnInit(): void {
  }

  getMediaPath(movie: boolean): string {
    return movie ? 'movies' : 'series';
  }

}
