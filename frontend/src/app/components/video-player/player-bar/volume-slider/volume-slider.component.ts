import { Component } from '@angular/core';

import { PlayerService } from '../../../../services/player.service';

@Component({
  selector: 'app-volume-slider',
  templateUrl: './volume-slider.component.html',
  styleUrls: ['./volume-slider.component.css']
})
export class VolumeSliderComponent {

  constructor(private readonly playerService: PlayerService) {}

  setVolume(value: number): void { this.playerService.setVolume(value) }
  toggleMute(): void { this.playerService.toggleMute() }

  getVolume(): number { return this.playerService.getVolume() }

}
