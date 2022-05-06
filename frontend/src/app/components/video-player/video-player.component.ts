import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  id: string = '';

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = <string>this.route.snapshot.paramMap.get('id');
  }

}
