import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../../../../services/player.service';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css']
})
export class PlayButtonComponent implements OnInit {

  constructor(private readonly playerService: PlayerService) {}

  ngOnInit(): void {}

  togglePlay(): void { this.playerService.togglePlay() }
  isPaused(): boolean { return this.playerService.isPaused() }

}
