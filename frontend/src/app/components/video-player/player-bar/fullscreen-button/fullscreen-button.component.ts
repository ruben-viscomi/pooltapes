import { Component } from '@angular/core';

import { PlayerService } from '../../../../services/player.service';

@Component({
  selector: 'app-fullscreen-button',
  templateUrl: './fullscreen-button.component.html',
  styleUrls: ['./fullscreen-button.component.css']
})
export class FullscreenButtonComponent {

  constructor(private readonly playerService: PlayerService) {}

  isFullscreen(): boolean { return this.playerService.isFullscreen() }

  toggleFullScreen(): void { this.playerService.toggleFullScreen() }

}
