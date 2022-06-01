import { Component } from '@angular/core';

import { PlayerService } from '../../../../services/player.service';

@Component({
  selector: 'app-progress-skip',
  templateUrl: './progress-skip.component.html',
  styleUrls: ['./progress-skip.component.css']
})
export class ProgressSkipComponent {

  constructor(private readonly playerService: PlayerService) {}

  skipVideoTime(value: number): void { this.playerService.skip(value) }

}
