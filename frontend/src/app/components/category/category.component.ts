import { Component, OnInit, Input } from '@angular/core';
import { ICategory } from '../../models/category.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() category: ICategory = {} as ICategory;
  constructor() {}

  ngOnInit(): void {}

  getMediaPath(movie: boolean): string {
    return movie ? 'movies' : 'series';
  }

}
